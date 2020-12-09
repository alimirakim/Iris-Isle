"""empty message

Revision ID: b5d5b4d1fa85
Revises: f0b3fd8636d9
Create Date: 2020-12-08 16:29:47.399940

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b5d5b4d1fa85'
down_revision = 'f0b3fd8636d9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('asset_effects', 'quantity',
               existing_type=sa.INTEGER(),
               nullable=0)
    op.drop_constraint('asset_effects_asset_id_fkey', 'asset_effects', type_='foreignkey')
    op.drop_constraint('asset_effects_effect_id_fkey', 'asset_effects', type_='foreignkey')
    op.create_foreign_key(None, 'asset_effects', 'assets', ['asset_id'], ['id'], ondelete='cascade')
    op.create_foreign_key(None, 'asset_effects', 'effects', ['effect_id'], ['id'], ondelete='cascade')
    op.drop_constraint('effects_thread_id_fkey', 'effects', type_='foreignkey')
    op.create_foreign_key(None, 'effects', 'threads', ['thread_id'], ['id'], ondelete='cascade')
    op.add_column('places', sa.Column('entity_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'places', 'entities', ['entity_id'], ['id'])
    op.alter_column('ranks', 'description',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_constraint('tales_chronicle_id_fkey', 'tales', type_='foreignkey')
    op.create_foreign_key(None, 'tales', 'chronicles', ['chronicle_id'], ['id'], ondelete='cascade')
    op.drop_constraint('thread_choices_choice_thread_id_fkey', 'thread_choices', type_='foreignkey')
    op.drop_constraint('thread_choices_current_thread_id_fkey', 'thread_choices', type_='foreignkey')
    op.create_foreign_key(None, 'thread_choices', 'threads', ['choice_thread_id'], ['id'], ondelete='cascade')
    op.create_foreign_key(None, 'thread_choices', 'threads', ['current_thread_id'], ['id'], ondelete='cascade')
    op.alter_column('threads', 'description',
               existing_type=sa.VARCHAR(),
               nullable=True)
    op.drop_constraint('threads_tale_id_fkey', 'threads', type_='foreignkey')
    op.create_foreign_key(None, 'threads', 'tales', ['tale_id'], ['id'], ondelete='cascade')
    # ### end Alembic commands ###


def downgrade():
    pass
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_constraint(None, 'threads', type_='foreignkey')
    # op.create_foreign_key('threads_tale_id_fkey', 'threads', 'tales', ['tale_id'], ['id'])
    # op.alter_column('threads', 'description',
              #  existing_type=sa.VARCHAR(),
              #  nullable=False)
    # op.drop_constraint(None, 'thread_choices', type_='foreignkey')
    # op.drop_constraint(None, 'thread_choices', type_='foreignkey')
    # op.create_foreign_key('thread_choices_current_thread_id_fkey', 'thread_choices', 'threads', ['current_thread_id'], ['id'])
    # op.create_foreign_key('thread_choices_choice_thread_id_fkey', 'thread_choices', 'threads', ['choice_thread_id'], ['id'])
    # op.drop_constraint(None, 'tales', type_='foreignkey')
    # op.create_foreign_key('tales_chronicle_id_fkey', 'tales', 'chronicles', ['chronicle_id'], ['id'])
    # op.alter_column('ranks', 'description',
    #            existing_type=sa.VARCHAR(),
    #            nullable=False)
    # op.drop_constraint(None, 'places', type_='foreignkey')
    # op.drop_column('places', 'entity_id')
    # op.drop_constraint(None, 'effects', type_='foreignkey')
    # op.create_foreign_key('effects_thread_id_fkey', 'effects', 'threads', ['thread_id'], ['id'])
    # op.drop_constraint(None, 'asset_effects', type_='foreignkey')
    # op.drop_constraint(None, 'asset_effects', type_='foreignkey')
    # op.create_foreign_key('asset_effects_effect_id_fkey', 'asset_effects', 'effects', ['effect_id'], ['id'])
    # op.create_foreign_key('asset_effects_asset_id_fkey', 'asset_effects', 'assets', ['asset_id'], ['id'])
    # op.alter_column('asset_effects', 'quantity',
    #            existing_type=sa.INTEGER(),
    #            nullable=False)
    # ### end Alembic commands ###
