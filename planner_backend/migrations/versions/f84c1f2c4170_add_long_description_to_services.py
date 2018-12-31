"""add long_description to services

Revision ID: f84c1f2c4170
Revises: 0c3267b8ca40
Create Date: 2018-12-26 22:51:08.763468

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f84c1f2c4170'
down_revision = '0c3267b8ca40'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('services', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default long description'
    ))


def downgrade():
    pass
