"use strict";

const Controller = require("egg").Controller;

const createRule = {
  positions: {
    type: "array",
    itemType: "object",
    rule: {
      department: "string",
      code: { type: "string", required: false },
      name: "string",
      type: "string",
      majorType: "string",
      minorType: "string",
      recruitment: "int",
      phone: "string",
      education: "string",
      degree: "string",
      gender: "string",
      experience: "string",
      politic: "string",
      nation: "string",
      age: "string",
      household: "string",
      major: "string",
      remarks: { type: "string", required: false },
    },
  },
};

class PositionController extends Controller {
  /**
   * Get upload file from http request.
   */
  async upload() {
    const filepath = await this.ctx.service.position.createFile();
    try {
      const positions = this.ctx.service.position.getPositionsByFile(filepath);
      this.ctx.validate(createRule, { positions });

      this.ctx.body = { msg: "File has been uploaded successfully." };
      this.ctx.status = 201;
    } catch (error) {
      this.ctx.body = {
        message: "Validation Failed",
        code: "invalid_file",
      };
      this.ctx.status = 400;
    }
  }

  async index() {
    this.ctx.body = {
      topic_id: "test",
    };
    this.ctx.status = 201;
  }

  async create() {
    // ctx.validate(createRule, ctx.request.body);
    this.ctx.body = {
      topic_id: "test",
    };
    this.ctx.status = 201;
  }
}

module.exports = PositionController;
