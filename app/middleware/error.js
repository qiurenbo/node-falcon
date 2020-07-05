const { AuthError, ValidatorError } = require("../error");

module.exports = () => {
  return async function error(ctx, next) {
    try {
      await next();
    } catch (error) {
      ctx.body = error;
      if (error instanceof AuthError) {
        ctx.status = 401;
      } else if (error instanceof ValidatorError) {
        ctx.status = 400;
      } else {
        ctx.body = {
          error: "server_internal_error",
          message: "server internal error",
        };
      }
    }
  };
};
