const express = require("express");
const { signupSchema } = require("../zod/signup");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { signinSchema } = require("../zod/signin");
const { updateUserSchema } = require("../zod/updateUser");
const { authMiddleware } = require("../middleware");

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
  await Account.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });
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

router.put("/", authMiddleware, async (req, res) => {
  const payload = req.body;
  const { success } = updateUserSchema.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  }
  const user = await User.updateOne({ _id: req.userId }, payload);
  res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter;
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  const usersNoPass = users.map((user) => {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    };
  });
  res.status(200).json({
    users: usersNoPass,
  });
});

module.exports = router;
