from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify, flash

app = Flask(__name__)
app.config["SECRET_KEY"] = "abc123"
boggle_game = Boggle()

@app.route('/boggle')
def board():
    session['board'] = boggle_game.make_board()

    return render_template('/boggle.html')

@app.route('/guess')
def validate_guess():
    guess = request.args.get('guess')
    validity = boggle_game.check_valid_word(session['board'], guess)
    if validity == "ok":
        session['score'] += len(guess)
    return jsonify({"result": validity})

@app.route('/post_score', methods=["POST"])
def post_score():
    
    highest = session.get('highest', 0)
    score = request.json["score"]
    
    session['num_plays'] += 1
    session['highest_score'] = max(highest, score)
    
    return jsonify({"highest": session['highest_score']})