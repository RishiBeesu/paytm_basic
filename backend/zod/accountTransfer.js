const zod = require("zod");

const accountTransferSchema = zod.object({
  to: zod.string(),
  amount: zod.number(),
});

module.exports = {
  accountTransferSchema,
};
