import express from "express";
import { login, signUp } from "../controllers/userController.js";
import validationErrorHandler from "../middlewares/validationErrorHandler.js";
import loginValidationSchema from "../validations/loginValidationSchema.js";
import signUpValidationSchema from "../validations/signUpValidationSchema.js";
const router = express.Router();

router.post("/signup", signUpValidationSchema, validationErrorHandler, signUp);
router.post("/login", loginValidationSchema, validationErrorHandler, login);

export default router;
