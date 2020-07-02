const jwt = require("jsonwebtoken");

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
      const token = ctx.cookies.get("accessToken");
      if (token) {
        try {
          jwt.verify(token, ctx.app.config.keys);
        } catch (error) {
          ctx.status = 403;
          ctx.body = error;

          return;
        }
        await next();
      } else {
        ctx.status = 403;
        ctx.body = {
          message: "Access Token Required",
          code: "required_access_token",
        };
        return;
      }
    }
  };
};
