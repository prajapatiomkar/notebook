import express from "express";
import {
  root,
  register,
  login,
  logout,
} from "../controllers/user.controller.js";
import passport from "passport";
import isAuthenticated from "../middlewares/user.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();
router.get("/", isAuthenticated, root);
router.get("/admin", isAuthenticated, isAdmin, root);
router.post("/register", register);
router.post("/login", passport.authenticate("login"), login);
router.delete("/logout", logout);

export default router;
