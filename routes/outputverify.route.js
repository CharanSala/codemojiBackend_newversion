import { outputverify } from "../controllers/outputverify.controller.js";
import express from "express";

const router = express.Router();

router.post("/outputverify", outputverify);

export default router;
