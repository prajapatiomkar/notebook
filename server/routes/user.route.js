import express from "express";
import {
  root,
  register,
  login,
  logout,
} from "../controllers/user.controller.js";
import passport from "passport";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
router.get("/", isAuthenticated, root);
router.post("/register", register);
router.post("/login", passport.authenticate("login"), login);
router.delete("/logout", logout);

export default router;
