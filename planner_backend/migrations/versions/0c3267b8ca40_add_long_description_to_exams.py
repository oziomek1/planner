"""add long_description to exams

Revision ID: 0c3267b8ca40
Revises: 
Create Date: 2018-12-23 17:34:21.133794

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c3267b8ca40'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('exams', sa.Column(
        'long_description',
        sa.Text,
        nullable=False,
        server_default='Default exam long description'
    ))


def downgrade():
    pass
