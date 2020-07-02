"use strict";

const Controller = require("egg").Controller;

class AuthController extends Controller {
  async login() {
    const rule = {
      username: "string",
      password: "string",
    };

    if (!this.ctx.service.helper.validate(rule, this.ctx.request.body)) {
      return;
    }

    // Find user and compare the crypto password
    const username = this.ctx.request.body.username;
    const user = await this.ctx.model.User.findOne({ where: { username } });
    const loginPassword = this.ctx.service.helper.cryptoString(
      this.ctx.request.body.password
    );

    // If username and password compared correctly
    if (user && user.password === loginPassword) {
      // set cookie
      const accessToken = this.ctx.service.auth.setCookies();
      this.ctx.body = { accessToken };
      this.ctx.status = 200;
    } else {
      // If username and password auth failed
      this.ctx.body = {
        code: "invalid_username_or_password",
        message: "Invalid username or password.",
      };
      this.ctx.status = 401;
    }
  }

  async register() {
    const rule = {
      username: "string",
      password: "string",
      email: "string",
    };

    if (!this.ctx.service.helper.validate(rule, this.ctx.request.body)) {
      return;
    }
    // HMAC
    this.ctx.request.body.password = this.ctx.service.helper.cryptoString(
      this.ctx.request.body.password
    );

    // Save user to database
    await this.ctx.model.User.create(this.ctx.request.body);

    // Set cookie
    const accessToken = this.ctx.service.auth.setCookies();
    this.ctx.body = { accessToken };
    this.ctx.status = 201;
  }
  logout() {}
}

module.exports = AuthController;