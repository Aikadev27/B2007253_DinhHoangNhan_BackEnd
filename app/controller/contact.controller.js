const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

exports.create = (req, res) => {
  res.send({ message: "create handler" });
};

exports.findAll = (req, res) => {
  res.send({ message: "findAll handler" });
};

exports.findOne = (req, res) => {
  res.send({ message: "fineOne handler" });
};

exports.update = (req, res) => {
  res.send({ message: "update handler" });
};

exports.delete = (req, res) => {
  res.send({ message: "delete handler" });
};

exports.deleteAll = (req, res) => {
  res.send({ message: "deleteAll handler" });
};

exports.findAllFavorite = (req, res) => {
  res.send({ message: "findAllFavorite handler 2" });
};

// create and save a new contact

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(404, "Name cannot empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    return res.document;
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

//

exports.findAll = async (req, res, next) => {
  let document = [];

  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      document = await contactService.findByName(name);
    } else {
      document = await contactService.findAll({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving contact")
    );
  }
  return res.send(document);
};
// find one

exports.findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id = ${req.params.id}`)
    );
  }
};
// update

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id = ${req.params.id}`)
    );
  }
};
// delete

exports.delete = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.delete(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id = ${req.params.id}`)
    );
  }
};
// findAllFavorite
exports.findAllFavorite = async (_req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findAllFavorite();
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "occurred while retrieving favorite contacts")
    );
  }
};
// delete all

exports.findAllFavorite = async (_req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.deleteAll();
    return res.send({
      message: `${deleteCount} contact were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "occurred while retrieving favorite contacts")
    );
  }
};

exports.deleteAll = async (_req, resnext) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const deletedCount = await contactService.deleteAll();
    return res.send({
      message: `${deletedCount} contact was deleted successfully`,
    });
  } catch (error) {
    new ApiError(500, "An error occured while  removing all contacts");
  }
};
