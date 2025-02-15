import { Router } from "express";
import * as UserController from "./user.controller.js"
import auth from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../untils/erroeHandling.js";
const router = Router();

router.get('/profile',asyncHandler(auth) ,asyncHandler(UserController.profile));

export default router;