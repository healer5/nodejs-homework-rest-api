const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

router.get("/", ctrl.allContacts);

// router.get("/:contactId", ctrl.contactById);

// router.post("/", ctrl.add);

// router.put("/:contactId", ctrl.contactUpdateById);

// router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
