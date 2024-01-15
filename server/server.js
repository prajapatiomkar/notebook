import { configDotenv } from "dotenv";
import express from "express";
import userRouter from "./routes/user.route.js";
import errorHandler from "./handlers/errorHandler.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import connectDB from "./utils/connectDB.js";
// import initializePassport from "./utils/passport.local.js";
import passport from "passport";
import userModel from "./models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcryptjs";

configDotenv();

// initializePassport(passport);

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        console.log("LocalStrategy");
        console.log(user);
        if (!user) {
          return done(null, false, { message: "user not found!" });
        } else {
          const matchPassword = await bcrypt.compare(password, user.password);

          if (!matchPassword) {
            return done(null, false, { message: "invalid credential!" });
          } else {
            return done(null, user, {
              message: "user logged in successfully!",
            });
          }
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// store the data into session
passport.serializeUser((user, done) => {
  console.log("serializeUser");
  console.log(user);
  return done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const existingUser = await userModel.findOne({ email: user.email });

  if (existingUser) {
    return done(null, existingUser);
  } else {
    return done(null, false);
  }
});

app.use(userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is up and running at port=${PORT}`);
});
