"""Flask app for Cupcakes"""
from flask import Flask, request, jsonify, render_template
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
app.app_context().push()
db.create_all()

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

def serialize_cupcake(cupcake):
    """Serialize a cupcake SQLAlchemy obj to dictionary."""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image
    }


@app.route("/")
def homepage():
    """Render the homepage for cupcakes"""

    return render_template('index.html')


@app.route("/api/cupcakes")
def list_all_cupcakes():
    """Return JSON {cupcakes: [{id, flavor, size, rating, image}, ...]}"""

    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcake(cupcake) for cupcake in cupcakes]

    return jsonify(cupcakes=serialized)


@app.route("/api/cupcakes/<int:ck_id>")
def list_sing_cupcakes(ck_id):
    """Return JSON {cupcakes: [id, flavor, size, rating, image]}"""

    cupcake = Cupcake.query.get_or_404(ck_id)
    serialized = serialize_cupcake(cupcake)

    return jsonify(cupcake=serialized)


@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    """Create cupcake from form data & return it.

    Returns JSON {'cupcakes': [id, flavor, size, rating, image]}
    """

    data = request.json
    flavor = data.get('flavor')
    size = data.get('size')
    rating = data.get('rating')
    image = data.get('image')

    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(cupcake)
    db.session.commit()

    serialized = serialize_cupcake(cupcake)

    return (jsonify(cupcake=serialized), 201)

@app.route("/api/cupcakes/<int:ck_id>", methods=["PATCH"])
def update_cupcakes(ck_id):
    """Update the given cupcake & return it.

    Returns JSON {'cupcakes': [id, flavor, size, rating, image]}
    """

    cupcake = Cupcake.query.get_or_404(ck_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    db.session.commit()

    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route("/api/cupcakes/<int:ck_id>", methods=["DELETE"])
def delete_cupcakes(ck_id):
    """Delete the given cupcake & return it.

    Returns JSON {'deleted': id}
    """

    cupcake = Cupcake.query.get_or_404(ck_id)
    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="deleted")