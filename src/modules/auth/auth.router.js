import { Router } from "express";
import * as AuthController from "./auth.controller.js"
import { asyncHandler } from "../../untils/erroeHandling.js";
import validation from "../../middleware/validation.js";
import { singinSchema, singupSchema } from "./auth.validation.js";
const router = Router();
router.post("/signup",validation (singupSchema),asyncHandler(AuthController.signUp));
router.post("/signin" ,validation(singinSchema),asyncHandler(AuthController.singIn));
router.post("/confirmEmail/:token" , asyncHandler(AuthController.confirmEmail));


export default router;