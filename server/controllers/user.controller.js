import passport from "passport";
import userModel from "../models/user.model.js";

const root = async (req, res, next) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .select("-password")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email?.length === 0 || password?.length === 0) {
      res.status(401).json({
        message: "all fields mandatory!",
      });
    } else {
      const user = await userModel.create({
        email,
        password,
      });
      await user.save();
      req.session.user = {
        _id: user._id,
      };
      res.status(200).json({
        message: "user register successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    res.send("login");
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      } else {
        res.status(200).json({ message: "user logout successfully!" });
      }
    });
  } catch (error) {
    next(error);
  }
};

export { root, register, login, logout };
