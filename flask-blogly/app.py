"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
app.app_context().push()
db.create_all()

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

@app.route("/users")
def user_list():
    """list all users"""

    users = User.query.all();
    return render_template("list.html", users = users)

@app.route("/users/<int:user_id>")
def user_profile(user_id):
    """render a profile for user"""

    user = User.query.get_or_404(user_id)
    posts = user.post
   
    return render_template("profile.html", user = user, posts = posts)

@app.route("/users/<int:user_id>/edit")
def user_profile_edit(user_id):
    """render profile edit page"""

    return render_template("edit.html", user_id = user_id)

@app.route("/users/<int:user_id>/edit", methods = ["POST"])
def user_profile_edit_form(user_id):
    """modify user profile and redirect to users list"""

    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    img_url = request.form["img_url"]

    user = User.query.get_or_404(user_id)

    if(first_name):
        user.first_name = first_name
    if(last_name):
        user.last_name = last_name
    if(img_url):
        user.img_url = img_url

    db.session.add(user)
    db.session.commit()

    return redirect("/users")

@app.route("/users/new")
def add_user_form():
    """render a page for adding user"""

    return render_template("form.html")

@app.route("/users/new", methods = ["POST"])
def add_user():
    """add user and redirects the user list page"""

    first_name = request.form["first_name"]
    last_name = request.form["last_name"]
    img_url = request.form["img_url"]

    user = User(first_name=first_name, last_name=last_name, img_url=img_url)

    db.session.add(user)
    db.session.commit()

    return redirect("/users")

@app.route("/users/<int:user_id>/delete")
def delete_user(user_id):
    """delete the current user"""

    User.query.filter_by(id=user_id).delete()
    db.session.commit()

    return redirect("/users")

@app.route("/posts/<int:post_id>")
def display_post(post_id):
    """Render a page for post form"""

    post =  Post.query.get_or_404(post_id)
    current_user = post.user
    tags = post.tags

    return render_template("display_post.html", post=post, user=current_user, tags = tags)

@app.route("/users/<int:user_id>/posts/new")
def add_post_form(user_id):
    """Render a page for post form"""

    user =  User.query.get_or_404(user_id)
    tags = Tag.query.all();

    return render_template("new_post_form.html", user=user, tags=tags)

@app.route("/users/<int:user_id>/posts/new", methods = ["POST"])
def add_post(user_id):
    """User adds a post"""

    title = request.form["title"]
    content = request.form["content"]

    post = Post(title=title, content=content, user_id=user_id)

    db.session.add(post)
    db.session.commit()

    return redirect(f"/users/{user_id}")

@app.route("/posts/<int:post_id>/edit")
def edit_post(post_id):
    """Render a page for edit post"""

    post =  Post.query.get_or_404(post_id)
    tags = Tag.query.all();

    return render_template("edit_post.html", post=post, tags = tags)

@app.route("/posts/<int:post_id>/edit", methods = ["POST"])
def edit_post_form(post_id):
    """post edit form"""

    title = request.form["title"]
    content = request.form["content"]

    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all();
    if(title):
        post.title = title
    if(content):
        post.content = content

    for tag in tags:
        if request.form.getlist(tag.name):
            post_tag = PostTag(post_id=post_id, tag_id=tag.id)
            db.session.add(post_tag)

    db.session.add(post)
    db.session.commit()

    return redirect(f"/posts/{post_id}")

@app.route("/posts/<int:post_id>/delete")
def delete_post(post_id):
    """delete the current post"""

    Post.query.filter_by(id=post_id).delete()
    db.session.commit()

    return redirect("/users")

@app.route("/tags")
def tag_list():
    """list all tags"""

    tags = Tag.query.all();
    return render_template("tag_list.html", tags = tags)

@app.route("/tags/<int:tag_id>/edit")
def edit_tag_form(tag_id):
    """Edit a tag"""

    tag = Tag.query.get(tag_id);
    return render_template("edit_tag.html", tag = tag)

@app.route("/tags/<int:tag_id>/edit", methods = ["POST"])
def edit_tag(tag_id):
    """Edit a tag"""

    name = request.form["name"]
    tag = Tag.query.get(tag_id)

    if(name):
        tag.name = name

    db.session.commit()

    return redirect("/tags")

@app.route("/tags/new")
def add_tag_form():
    """Render a page for tag form"""

    return render_template("new_tag_form.html")

@app.route("/tags/new", methods = ["POST"])
def add_tag():
    """add a tag then redirects to tag list page"""

    name = request.form["name"]

    tag = Tag(name=name)

    db.session.add(tag)
    db.session.commit()

    return redirect(f"/tags")

@app.route("/tags/<int:tag_id>")
def tag_detail(tag_id):
    """render a page of tag in detail"""

    tag = Tag.query.get_or_404(tag_id)
    posts = tag.posts
   
    return render_template("tag_detail.html", tag = tag, posts = posts)

@app.route("/tags/<int:tag_id>/delete")
def delete_tag(tag_id):
    """delete the current tag"""

    Tag.query.filter_by(id=tag_id).delete()
    db.session.commit()

    return redirect("/tags")