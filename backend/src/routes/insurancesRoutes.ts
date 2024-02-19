import express from "express";
import * as insurancesController from "../controllers/insurance.controller.js";
import * as insuranceConfigsController from "../controllers/insurance-config.controller.js";

const router = express.Router();

router.get("/", insurancesController.getAll);

router.get("/:id", insurancesController.get);

router.post("/", insurancesController.create);

router.put("/:id", insurancesController.update);

router.delete("/:id", insurancesController.remove);

router.post("/insuranceConfigs", insuranceConfigsController.create);

router.get("/insuranceConfigs", insuranceConfigsController.getAll);

export default router;
