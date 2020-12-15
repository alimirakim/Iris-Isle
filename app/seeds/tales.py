from app.models import db, Tale
    
    
def seed_tales():
    """Seed a tale for Demo Chronicle."""
    tale1 = Tale(
        chronicle_id=1,
        title="Demo Tale",
        description="A demonstration tale.",
        first_thread_id=1,
        image="scroll",
        )
    tale2 = Tale(
        chronicle_id=1,
        title="D.Va Goes to San Francisco",
        description="Play as the famous #1 e-sports champ and MEKA hero Hana Song as she explores the best and worst of the S.F!",
        image="scroll",
        )
    tale3 = Tale(
        chronicle_id=1,
        title="Meet the Sweet Family",
        description="Unlocked with a good enough relationship with the Sweet Fairy. Meet its family with a friendly invitation found in your mailbox.",
        image="scroll",
        )
    db.session.add(tale1)
    db.session.add(tale2)
    db.session.add(tale3)
    db.session.commit()
    
def undo_tales():
    db.session.execute('TRUNCATE tales RESTART IDENTITY CASCADE;')
    db.session.commit()
