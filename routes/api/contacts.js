const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", ctrl.allContacts);

router.get("/:id", isValidId, ctrl.contactById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.contactUpdateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.contactUpdateFavorite
);

router.delete("/:id", isValidId, ctrl.deleteContact);

module.exports = router;
