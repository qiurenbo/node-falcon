"use strict";

const Controller = require("egg").Controller;

const createRule = {
  accesstoken: "string",
  title: "string",
  tab: { type: "enum", values: ["ask", "share", "job"], required: false },
  content: "string",
};

class PositionController extends Controller {
  /**
   * Get upload file from http request.
   */
  async upload() {
    const { ctx } = this;
    const filepath = await ctx.service.position.createFile();
    await ctx.service.position.createPositionsByFile(filepath);
    ctx.body = `user: ${ctx.params.year}, ${ctx.params.provinceId}`;
    ctx.status = 201;
  }

  async index() {
    const ctx = this.ctx;
    ctx.body = {
      topic_id: "test",
    };
    ctx.status = 201;
  }

  async create() {
    const ctx = this.ctx;
    // ctx.validate(createRule, ctx.request.body);
    ctx.body = {
      topic_id: "test",
    };
    ctx.status = 201;
  }
}

module.exports = PositionController;
