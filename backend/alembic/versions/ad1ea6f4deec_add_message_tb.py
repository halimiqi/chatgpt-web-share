"""add_message_tb

Revision ID: ad1ea6f4deec
Revises: 
Create Date: 2023-04-18 00:53:05.987583

"""
from alembic import op
import sqlalchemy as sa
from api.config import config
from api.models import Base, User, Conversation, Message
import sqlalchemy
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine


# revision identifiers, used by Alembic.
revision = 'ad1ea6f4deec'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    database_url = config.get("database_url")
    engine = create_async_engine(database_url, echo=config.get("print_sql", False))
    with engine.begin() as conn:  ## here should be begin not connect
        ## if it is connect, then it will only commit by yourself,
        ## but with begin(), it will commit automatically
        # 判断数据库是否存在
        def use_inspector(conn):
            inspector = sqlalchemy.inspect(conn)
            return inspector.has_table("message")

        result = conn.run_sync(use_inspector)
        if not result:
            logger.info("database not exists, creating database...")
            # await conn.run_sync(Base.metadata.drop_all)
            conn.run_sync(Message.metadata.create_all)  ## 添加所有用户
    pass


def downgrade() -> None:
    engine = create_async_engine(database_url, echo=config.get("print_sql", False))
    with engine.begin() as conn:
        conn.run_sync(Message.metadata.drop_all)
    pass
