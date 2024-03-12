"""Flask app for Cupcakes"""
from flask import Flask, request, render_template, redirect, session, flash
from models import db, connect_db, User, Feedback
from form import UserForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

@app.route("/")
def homepage():
    """ """
    if 'username' not in session:
        return redirect('/register')
    
    return redirect(f'/users/{session["username"]}')


@app.route("/register", methods = ["GET", "POST"])
def register_user():
    """Register a new user"""

    form = UserForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        new_user = User.register(username,password,email,first_name,last_name)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken.  Please pick another')
            return render_template('register_user.html', form=form)

        session['username'] = username
        return redirect(f'/users/{username}')

    return render_template('register_user.html', form=form)

@app.route("/login", methods = ["GET", "POST"])
def login_user():
    """Login a user"""

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)
        
        if user:
            session['username'] = username
            return redirect(f'/users/{username}')
        else:
            form.username.errors = ['Invalid username/password.']

    return render_template('login_user.html', form=form)

@app.route("/logout", methods = ["GET", "POST"])
def logout_user():
    """Logout the current user"""
    session.pop('username')

    return redirect('/')


@app.route("/users/<string:username>")
def render_user_profile(username):
    """Render the user's profile and his feedback list """

    if 'username' not in session or session['username'] != username:
            return redirect('/')
    
    user = User.query.get_or_404(username)

    feedbacks = user.feedbacks

    return render_template('user_profile.html', 
                           username = user.username, first_name = user.first_name, last_name = user.last_name, email = user.email, feedbacks=feedbacks)


@app.route("/users/<string:username>/delete", methods = ["GET", "POST"])
def delete_user(username):
    """delete the current user and his list of feedbacks"""    

    if 'username' not in session or session['username'] != username:
        return redirect('/')
    
    user = User.query.get_or_404(username)
    feedbacks = user.feedbacks
    
    if feedbacks:
        for feedback in feedbacks:
            db.session.delete(feedback)

    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    return redirect(f'/login')

@app.route("/users/<string:username>/feedback/add", methods = ["GET", "POST"])
def add_feedback(username):
    """Add a new feedback"""

    if 'username' not in session or session['username'] != username:
        return redirect('/')

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        new_feedback = Feedback(title=title, content=content, username=username)
        db.session.add(new_feedback)
        db.session.commit()
        return redirect(f'/users/{username}')

    return render_template('add_feedback.html', form=form)

@app.route("/feedback/<int:f_id>/update", methods = ["GET", "POST"])
def update_feedback(f_id):
    """Update the selected feedback"""

    feedback = Feedback.query.get_or_404(f_id)
    username = feedback.user.username

    if 'username' not in session or session['username'] != username:
        return redirect('/')

    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        feedback.title = title
        feedback.content = content
        db.session.commit()
        return redirect(f'/users/{username}')

    return render_template('update_feedback.html', form=form)

@app.route("/feedback/<int:f_id>/delete", methods = ["GET", "POST"])
def delete_feedback(f_id):
    """delete the feeback from the list"""    

    feedback = Feedback.query.get_or_404(f_id)
    username = feedback.user.username

    if 'username' not in session or session['username'] != username:
        return redirect('/')
    
    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{username}')