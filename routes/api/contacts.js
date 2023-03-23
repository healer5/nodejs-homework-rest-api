const express = require("express");
const ctrl = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.allContacts);

router.get("/:id", authenticate, isValidId, ctrl.contactById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.putSchema),
  ctrl.contactUpdateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.contactUpdateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
