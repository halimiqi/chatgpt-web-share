from fastapi.encoders import jsonable_encoder
from revChatGPT.V1 import AsyncChatbot
import asyncio
import os
from datetime import datetime, timedelta
from sqlalchemy import select, or_, and_, delete, func
from api.config import config
from api.enums import ChatModels, Role
from api.models import User, Conversation, Message
from api.database import get_async_session_context
from api.exceptions import InvalidParamsException
from utils.common import get_conversation_model
from api.response import response
import logging
import openai
import uuid
from utils.logger import get_logger
logger = get_logger(__name__)
# os.environ["OPENAI_API_KEY"] = "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"
## this is a pack on openai api
## v1 get all data from database
## v2 use redis to overcome the retrieve from database everytime
class ChatBot:

    def __init__(self):
        self.history_messages = []
        self.round = 0  
        self.title_length = int(config.get("title_length"))
        self.semaphore = asyncio.Semaphore(1)
        openai.api_key ="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"
        return

    def is_busy(self):
        return self.semaphore.locked()

    async def ask(self, conv_id, input_text, model_name = ChatModels.gpt3_5):
        ## get conv info
        ## get history messages
        new_conv_flag = False
        messages, _ = await self.get_history_messages(conv_id)
        if messages is None:
            logger.error("henley: hist message is None")
            return None
        if len(messages) == 0:
            new_conv_flag = True
            ## new conversation, use the prompt:
            messages = self.prompt_engine(messages)
            logger.error("New conversation, so use the default prompt")
        messages.append(
            {"role":"user",
             "content": input_text}
        )
        res = openai.ChatCompletion.create(
            model=model_name.value,
            messages=messages,
            max_tokens=30
        )
        answer_content = res["choices"][0]["message"]["content"]
        ## save the message into messages
        content_list = []
        role_list = []
        message_id_list = []
        if new_conv_flag:
            ## if new conversation store all history message
            for mess in messages:
                content_list.append(mess['content'])
                role_list.append(Role(mess['role']).name)
                match Role(mess['role']):
                    case Role.system:
                        message_id_list.append(str(uuid.uuid4()) + "0")
                    case Role.user:
                        message_id_list.append(str(uuid.uuid4()) + "1")
                    case Role.assistant:
                        message_id_list.append(str(uuid.uuid4()) + "2")
        else:
            # new existing conversation, only store the newest user and assistant message
            content_list.append(input_text)
            role_list.append(Role.user)
            message_id_list.append(str(uuid.uuid4()) + "1")
        content_list.append(answer_content)
        role_list.append(Role.assistant)
        message_id_list.append(str(uuid.uuid4()) + "2")
        logger.debug("henley: save_current_messages trigger!!!!! and conv_id is {}".format(conv_id))
        # await self.save_current_messages(content_list, role_list, user_id, conv_id)
        return answer_content,  content_list, role_list, message_id_list

    async def get_conversations(self, user_id):
        ## get history_conversations for users
        if user_id is not None:
            async with get_async_session_context() as session:
                ret = await session.execute(select(Conversation).where(Conversation.user_id == user_id))
                results = ret.scalars().all()
                return results
        else:
            return None
    async def save_current_messages(self, content_list, role_list, message_id_list, user_id, conv_id, session):
        ## get user_id from conv_id
        if len(content_list) != len(role_list):
            raise InvalidParamsException("Save Message, the content length is not same as role length")
        if len(content_list) != len(message_id_list):
            raise InvalidParamsException("Save Message, the content length is not same as message_id length")
        # ret = await session.execute(select(Conversation).where(Conversation.conversation_id == conv_id))
        # result = ret.scalars().one_or_none()
        ### get message
        create_time = -1
        ## if there is the new conversation
        for idx in range(len(content_list)):
            if create_time == -1:
                create_time = datetime.utcnow()
            if role_list[idx] == Role.assistant:
                create_time = create_time + timedelta(milliseconds=5)
            message = Message(
                user_id = user_id,
                conv_id = conv_id,
                role = role_list[idx],
                text = content_list[idx],
                message_id = message_id_list[idx],
                status = True,
                create_time = create_time
            )
            session.add(message)
            logger.debug("henley: save the current messages: {}, {}".format(content_list[idx], idx))
        logger.debug("henley: save method end!!!!!!")      
        return response(201)
    
    async def get_history_messages(self, conv_id):
        ## read history from databases
        ## 数据库操作3连
        ## 新对话的conv_id就是None, 所以这里要兼容
        async with get_async_session_context() as session:
            ## get user_id of 
            prompt_hist_list = []
            message_id_list = []
            if conv_id is not None:
                stat = and_(Message.conv_id == conv_id, Message.status == True)
                ret = await session.execute(select(Message).where(stat).order_by(Message.create_time))
                results = ret.scalars().all()
                ## set the messages to openAI format
                
                if len(results) > 0:
                    for message in results:
                        prompt_hist_list.append(
                            {"role": message.role.value,
                            "content": message.text,
                            }
                        )
                        message_id_list.append(str(message.message_id))
                        logger.debug("henley:the role: {0} content: {1}, message_id:{2}".format(message.role, message.text, str(message.id)))
            else:
                logger.error("henley: the conv_id should never be none!!")
            return prompt_hist_list, message_id_list
            

    async def gen_title(self, conv_id, conversation: Conversation):
        ## get_title for first sentence of conversation
        ## 1. get first_history message
        ## 数据库操作3连
        async with get_async_session_context() as session:
            ## get user_id of 
            if conv_id is not None:
                stat = and_(Message.conv_id == conv_id, Message.status == True)
                ret = await session.execute(select(Message).where(stat).order_by(Message.create_time))
                result = ret.scalars().first()
                ## set the messages to openAI format
                if result is None:
                   logging.debug("There is no history message")
                   return None 
                ## if there is history messages, then fetch the item 
                message = result.text
                if len(message) > self.title_length:
                    message = message[:self.title_length]
                ## save the title in the database
                conversation.title = message
                session.add(conversation)
                await session.commit()
                await session.refresh(conversation)
                return message 
            else:
                return None
        return
    
    async def set_title(self,title, session, conv_id, conversation):
        ## set the new title to database
        if conv_id is not None:
            conversation.title = title
            session.add(conversation)
            await session.commit()
            await session.refresh(conversation)
        else:
            InvalidParamsException("the Conv_id is None when setting the new title of conversation!")
        return 0
    def clear_title(self):
        ## clean the title value from database
        return 
    

    def print_chat(self, user_text, answer):
        if self.mode == 2:
            ## chat mode
            # print("用户：",user_text)
            print("回答：", answer)


    def prompt_engine(self, input_json_list, mode = 2):
        mode = 2
        if (mode == 0):
            ## TODO as a rewrite writer
            a = 1
        elif (mode == 1):
            ## TODO as a translator
            a = 2
        elif (mode == 2):
            ## TODO as a chatbot
            input_json_list.extend([
                {"role": "system", "content": "You are a helpful assistant.You need to repond the questions with Chinese.The answer should be brief possibly!"}
                ]
            )
        return input_json_list