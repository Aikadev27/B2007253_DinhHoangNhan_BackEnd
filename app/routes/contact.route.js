const express = require("express");
const { route } = require("../../app");

const contact = require("../controller/contact.controller");

const router = express.Router();

router
  .route("/")
  .get(contact.findAll)
  .post(contact.create)
  .delete(contact.deleteAll);

router.route("/favorite").get(contact.findAllFavorite);

router
  .route("/:id")
  .get(contact.findOne)
  .put(contact.update)
  .delete(contact.delete);

module.exports = router;
