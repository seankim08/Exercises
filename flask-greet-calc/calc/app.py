# Put your app in here.
from flask import Flask, request
from operations import add,sub,mult,div

app = Flask(__name__)

@app.route('/add')
def web_add():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return str(add(a,b))

@app.route('/sub')
def web_sub():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return str(sub(a,b))

@app.route('/mult')
def web_mult():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return str(mult(a,b))

@app.route('/div')
def web_div():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return str(div(a,b))

OPERAND = {'add': add,'sub': sub,'mult': mult,'div': div}

@app.route('/math/<operation>')
def web_math(operation):
    if(operation in OPERAND):
        a = int(request.args['a'])
        b = int(request.args['b'])
        return str(OPERAND[operation](a,b))
