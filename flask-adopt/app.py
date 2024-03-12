from flask import Flask, request, redirect, render_template, flash
from models import db, connect_db, Pet
from form import PetForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_pet'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
app.app_context().push()
db.create_all()

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

@app.route("/")
def homepage():
    """Render the homepage"""

    pets = Pet.query.all()

    return render_template("homepage.html", pets=pets)

@app.route("/add", methods=["GET", "POST"])
def add_pet():
    """Add pet form"""

    form = PetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(pet)
        db.session.commit()
        flash(f"Added {name} to the adoption list")
        return redirect("/")
    else:
        return render_template("add_pet.html", form=form)
    
@app.route("/<int:pet_id>")
def pet_detail(pet_id):
    """Render a profile page of the selected pet"""

    pet = Pet.query.get_or_404(pet_id)

    return render_template("pet_profile.html", pet=pet)

@app.route("/<int:pet_id>/edit", methods=["GET", "POST"])
def edit_pet(pet_id):
    """edit pet form"""

    pet = Pet.query.get_or_404(pet_id)
    form = PetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data

        db.session.commit()
        flash(f"Edited {pet.name} in the adoption list")
        return redirect("/")
    else:
        return render_template("edit_pet.html", form=form, pet=pet)
    
@app.route("/<int:pet_id>/delete")
def delete_pet(pet_id):
    """delete the pet from the adoption list"""

    pet = Pet.query.filter_by(id=pet_id).delete()
    db.session.commit()
    return redirect("/")