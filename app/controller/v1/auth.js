"use strict";

const { AuthError, ValidatorError } = require("../../error");
const { invalidUsernameOrPassword } = require("../../error/commonErrors");
const Controller = require("egg").Controller;

class AuthController extends Controller {
  async login() {
    const rule = {
      username: "string",
      password: "string",
    };

    this.ctx.service.helper.validate(rule, this.ctx.request.body);
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
      throw new AuthError(
        invalidUsernameOrPassword,
        "invalid username or password"
      );
    }
  }

  async register() {
    const rule = {
      username: "string",
      password: "string",
      email: "string",
    };

    this.ctx.service.helper.validate(rule, this.ctx.request.body);
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
