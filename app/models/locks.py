from .db import db
from datetime import datetime

# location, trial, status, time, attire


class Lock(db.Model):
    """A requirement for access to a thread choice. CHOICE, not actual thread"""
    __tablename__ = "locks"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False, default="asset") # (db.Enum("asset", "location", "time", "trial", "status", "presentation"), nullable=False, default="proof")
    choice_id = db.Column(db.Integer, db.ForeignKey("thread_choices.id"), nullable=False)
    color = db.Column(db.String(50), default="rgb(70,60,70)")
    image = db.Column(db.String(250), default="unlock-alt")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    
    choice = db.relationship("ThreadChoice", back_populates="locks")
    asset_lock = db.relationship("AssetLock", back_populates="lock")
    
    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "choice_id": self.choice_id,
            "color": self.color,
            "image": self.image,
            "created_at": self.created_at,
        }
        
    # TODO Consider making custom dicts per lock type?

      
class AssetLock(db.Model):
    """A type of lock that requires some asset to unlock a Thread Choice."""
    __tablename__ = "asset_locks"
    id = db.Column(db.Integer, primary_key=True)
    lock_id = db.Column(db.Integer, db.ForeignKey("locks.id"), nullable=False)
    asset_id = db.Column(db.Integer, db.ForeignKey("entities.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    type = db.Column(db.String, nullable=False, default="price") #proof, prohibited
    
    lock = db.relationship("Lock", back_populates="asset_lock")
    asset = db.relationship("Entity", back_populates="asset_locks")
    
    def to_dict(self):
        """Convert into dictionary."""
        return {
            "id": self.id,
            "choice_id": self.lock.choice_id,
            "lock_id": self.lock_id,
            "asset_id": self.asset_id,
            "quantity": self.quantity,
            "type": self.type,
        }
