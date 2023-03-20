const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const allContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner },
    {
      skip,
      limit,
    }
  ).populate("owner", "name email");
  res.status(200).json(contacts);
};

const contactById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findOne({ _id: id, owner: userId });
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const contactUpdateById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }
  res.json(result);
};

const contactUpdateFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, `Product with id=${id} not found`);
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findByIdAndRemove({
    _id: id,
    owner: userId,
  });
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
