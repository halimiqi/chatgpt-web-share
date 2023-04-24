import enum


class ChatStatus(enum.Enum):
    asking = "asking"
    queueing = "queueing"
    idling = "idling"


class ChatModels(enum.Enum):
    gpt3_5 = "gpt-3.5-turbo"
    gpt4 = "gpt-4"
    default = "gpt-3.5-turbo"
    paid = "text-davinci-002-render-paid"
    unknown = ""

class Role(enum.Enum):
    system = "system"
    user = "user"
    assistant = "assistant"
    