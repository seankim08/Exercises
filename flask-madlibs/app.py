from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/madlibs')
def madlibs():
    return render_template('/madlibs.html')

@app.route('/story')
def story():
    place = request.args.get('place')
    verb = request.args.get('verb')
    noun = request.args.get('noun')
    adjective = request.args.get('adjective')
    plural_noun = request.args.get('plural_noun')
    return render_template('/story.html', place=place, verb=verb, noun=noun, adjective=adjective, plural_noun=plural_noun)