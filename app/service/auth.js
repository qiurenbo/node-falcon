"use strict";

const Service = require("egg").Service;

class AuthService extends Service {
  /**
   * Put JWT in cookie and set cookie
   * @return token stored in cookie
   */
  setCookies() {
    // create JWT
    const accessToken = this.ctx.service.helper.createJWT(
      this.ctx.request.body.username
    );

    // set cookie
    this.ctx.cookies.set("accessToken", accessToken, {
      maxAge: 1000 * 3600 * 24 * 7,
    });

    return accessToken;
  }
}

module.exports = AuthService;
