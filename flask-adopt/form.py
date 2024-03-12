from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, URLField, IntegerField
from wtforms.validators import InputRequired, Optional, NumberRange

class PetForm(FlaskForm):
    """Form for adding pet to adoption lisit"""

    name = StringField("Name",
                       validators=[InputRequired(message='Name is required')])
    species = SelectField("Species",
                        choices=[('cat', 'Cat'), ('dog', 'Dog'), ('porcupine', 'Porcupine')])
    photo_url = URLField("Photo Url", 
                         validators=[Optional()])
    age = IntegerField("Age", 
                       validators=[NumberRange(min=0, max=30), Optional()])
    notes = StringField("Notes",
                       validators=[Optional()])
