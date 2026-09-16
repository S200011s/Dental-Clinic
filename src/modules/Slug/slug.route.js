import express from "express";
import * as slugController from "./slug.controller.js";

const router = express.Router();

router.get("/id-to-slug/:type/:id", slugController.getIdToSlug);
router.get("/resolve/:type/:slug", slugController.getSlugToId);

export default router;