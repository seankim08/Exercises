from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, EmailField, TextAreaField
from wtforms.validators import InputRequired, Length

class UserForm(FlaskForm):
    """Form for registering a new user"""

    username = StringField("Username",
                       validators=[InputRequired(), Length(max=20)])
    password = PasswordField("Password",
                        validators=[InputRequired()])
    email = EmailField("Email", 
                         validators=[InputRequired(), Length(max=50)])
    first_name = StringField("First Name", 
                       validators=[InputRequired(), Length(max=30)])
    last_name = StringField("Last Name",
                       validators=[InputRequired(), Length(max=30)])
    

class LoginForm(FlaskForm):
    """Form for login a user"""

    username = StringField("Username",
                       validators=[InputRequired(), Length(max=20)])
    password = PasswordField("Password",
                        validators=[InputRequired()])
    

class FeedbackForm(FlaskForm):
    """Form for login a user"""

    title = StringField("Title",
                       validators=[InputRequired(), Length(max=100)])
    content = TextAreaField("Content",
                        validators=[InputRequired()])