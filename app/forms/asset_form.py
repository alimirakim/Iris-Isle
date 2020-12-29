from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SelectField, FileField
from wtforms.validators import DataRequired, ValidationError
from app.models import Asset
from app.utils import within_length_limit, color_choices, icon_choices


class AssetForm(FlaskForm):
    """Maps form inputs to apply backend validations."""
    category = StringField()
    title = StringField(validators=[DataRequired(), within_length_limit], default="Untitled")
    description = StringField()
    color = SelectField(choices=color_choices, validators=[DataRequired()], default=color_choices[0])
    icon = SelectField(choices=icon_choices, validators=[DataRequired()], default=icon_choices[0])
    image = FileField()
    value = IntegerField()
    max = IntegerField()
    is_allowed_multiple = BooleanField()