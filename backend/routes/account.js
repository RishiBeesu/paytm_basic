const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { accountTransferSchema } = require("../zod/accountTransfer");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.status(200).json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const payload = req.body;
  const { success } = accountTransferSchema.safeParse(payload);
  if (!success) {
    return res.status(411).json({
      message: "Invalid Inputs",
    });
  }
  const fromAccount = await Account.findOne({
    userId: req.userId,
  });
  if (fromAccount.balance < payload.amount) {
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  const toAccount = await Account.findOne({
    userId: payload.to,
  });
  if (!toAccount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  const session = await mongoose.startSession(); //can we start session here or should we wrap the whole code in transaction
  session.startTransaction();
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -payload.amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    {
      userId: payload.to,
    },
    {
      $inc: {
        balance: payload.amount,
      },
    }
  );
  await session.commitTransaction();
  await session.endSession();
  res.status(200).json({
    message: "Transfer successful",
  });
});

module.exports = router;
