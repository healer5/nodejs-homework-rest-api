const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const contactById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id });
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const contactUpdateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }
  res.json(result);
};

const contactUpdateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }
  res.json({
    message: "product deleted",
  });
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  contactById: ctrlWrapper(contactById),
  add: ctrlWrapper(add),
  contactUpdateById: ctrlWrapper(contactUpdateById),
  contactUpdateFavorite: ctrlWrapper(contactUpdateFavorite),
  deleteContact: ctrlWrapper(deleteContact),
};
