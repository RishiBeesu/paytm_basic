const express = require("express");
const { signupSchema } = require("../zod/signup");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { signinSchema } = require("../zod/signin");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const payload = req.body;
  const { success } = signupSchema.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: payload.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
  const user = await User.create(payload);
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );
  res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const payload = req.body;
  const { success } = signinSchema.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  }
  const user = await User.findOne(payload);
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.status(200).json({
      token: token,
    });
  } else {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

module.exports = router;
