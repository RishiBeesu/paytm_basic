const zod = require("zod");

const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});
module.exports = {
  signupSchema,
};
