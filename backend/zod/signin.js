const zod = require("zod");

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

module.exports = {
  signinSchema,
};
