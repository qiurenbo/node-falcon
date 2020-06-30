"use strict";

const Controller = require("egg").Controller;
const createRule = {
  accesstoken: "string",
  title: "string",
  tab: { type: "enum", values: ["ask", "share", "job"], required: false },
  content: "string",
};

class PositionController extends Controller {
  async upload() {
    const { ctx } = this;
    const filename = await ctx.service.position.createFile();

    ctx.body = {};
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
