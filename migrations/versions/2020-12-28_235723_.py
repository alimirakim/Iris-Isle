"""empty message

Revision ID: 325540a4c46a
Revises: ccd4b6bdc28c
Create Date: 2020-12-28 23:57:23.988245

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '325540a4c46a'
down_revision = 'ccd4b6bdc28c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('asset_effects_thread_id_fkey', 'asset_effects', type_='foreignkey')
    op.create_foreign_key(None, 'asset_effects', 'threads', ['thread_id'], ['id'], ondelete='cascade')
    op.drop_constraint('asset_locks_choice_id_fkey', 'asset_locks', type_='foreignkey')
    op.create_foreign_key(None, 'asset_locks', 'choices', ['choice_id'], ['id'], ondelete='cascade')
    op.drop_constraint('slots_chronicle_id_fkey', 'slots', type_='foreignkey')
    op.create_foreign_key(None, 'slots', 'chronicles', ['chronicle_id'], ['id'], ondelete='cascade')
    op.drop_constraint('tales_chronicle_id_fkey', 'tales', type_='foreignkey')
    op.create_foreign_key(None, 'tales', 'chronicles', ['chronicle_id'], ['id'], ondelete='cascade')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tales', type_='foreignkey')
    op.create_foreign_key('tales_chronicle_id_fkey', 'tales', 'chronicles', ['chronicle_id'], ['id'])
    op.drop_constraint(None, 'slots', type_='foreignkey')
    op.create_foreign_key('slots_chronicle_id_fkey', 'slots', 'chronicles', ['chronicle_id'], ['id'])
    op.drop_constraint(None, 'asset_locks', type_='foreignkey')
    op.create_foreign_key('asset_locks_choice_id_fkey', 'asset_locks', 'choices', ['choice_id'], ['id'])
    op.drop_constraint(None, 'asset_effects', type_='foreignkey')
    op.create_foreign_key('asset_effects_thread_id_fkey', 'asset_effects', 'threads', ['thread_id'], ['id'])
    # ### end Alembic commands ###