const { NotFound } = require("http-errors");
const Joi = require("joi");
const { nanoid } = require("nanoid");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const allContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const contactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await addContact({ id: nanoid(), ...req.body });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const contactUpdateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }

    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      message: "product deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  allContacts,
  contactById,
  add,
  contactUpdateById,
  deleteContact,
};
