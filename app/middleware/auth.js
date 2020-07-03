const jwt = require("jsonwebtoken");
const { AuthError } = require("../error");
const { invalidToken } = require("../error/commonErrors");
module.exports = () => {
  /**
   * get access token from cookie
   */
  return async function auth(ctx, next) {
    /**
     * skip urls that no need for auth
     * TODO could be configured
     */
    if (
      ctx.request.url.includes("register") ||
      ctx.request.url.includes("login")
    ) {
      await next();
    } else {
      try {
        const token = ctx.cookies.get("accessToken");
        if (!token) {
          throw new AuthError(invalidToken, "token required");
        }

        // Find user
        const username = jwt.verify(token, ctx.app.config.keys).username;
        const user = await ctx.model.User.findOne({
          where: { username: username },
        });

        if (!user) {
          throw new AuthError(invalidToken, "invalid token");
        }

        await next();
      } catch (error) {
        ctx.status = 401;
        ctx.body = error;
        return;
      }
    }
  };
};
