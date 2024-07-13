const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const Message = require("../models/message");
const { ensureLoggedIn } = require("../middleware/auth");

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const message = await Message.get(req.params.id);
    if (message.from_user.username !== req.user.username && message.to_user.username !== req.user.username) {
      throw new ExpressError("Cannot read this message", 401);
    }
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const { to_username, body } = req.body;
    const message = await Message.create({
      from_username: req.user.username,
      to_username,
      body
    });
    return res.json({ message });
  } catch (err) {
    return next(err);
  }
});

router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
  try {
    const message = await Message.get(req.params.id);
    if (message.to_user.username !== req.user.username) {
      throw new ExpressError("Cannot set this message to read", 401);
    }
    const readMessage = await Message.markRead(req.params.id);
    return res.json({ message: readMessage });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;