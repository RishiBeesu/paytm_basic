const zod = require("zod");

const updateUserSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

module.exports = {
  updateUserSchema,
};
