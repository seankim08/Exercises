from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    """Say welcome"""
    return "welcome"

@app.route('/welcome/<str_arg>')
def welcome_str(str_arg):
    """Will welcome the user to be in home or back"""
    if(str_arg == 'home'):
        return "welcome home"
    elif(str_arg == 'back'):
        return "welcome back"