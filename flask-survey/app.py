from flask import Flask, render_template, redirect, request, flash, session
from surveys import Survey, Question, satisfaction_survey


app = Flask(__name__)
responses = []

app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"



@app.route("/", methods=["GET"])
def homepage():
    """Show homepage link to start survey."""
    
    session['responses'] = []
    session['question_num'] = 0

    return render_template("index.html", survey = satisfaction_survey)

@app.route("/", methods=["POST"])
def set_session():
    """Set quetion number and responses list"""
    
    session['responses'] = []
    session['question_num'] = 0
    
    return redirect(f"/questions/{session['question_num']}")


@app.route("/questions/<int:num>")
def question(num):
    """Render to show a question from the survey"""
    
    if session['question_num'] != num:
        flash('Please answer the question in order')
        return redirect(f"/questions/{session['question_num']}")
        

    return render_template("question.html", question = satisfaction_survey.questions[num])


@app.route("/answer", methods=["POST"])
def answer():
    """Handle the answers"""
    
    answer = request.form['survey']
    session['responses'].append(answer)
    session['question_num'] += 1
    
    if(session['question_num'] >= len(satisfaction_survey.questions)):
        return redirect("/thank")
    
    return redirect(f"/questions/{session['question_num']}")

@app.route("/thank")
def thank():
    """Render a page for user completing the survey"""

    return render_template("thank.html")