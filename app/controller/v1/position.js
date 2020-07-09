"use strict";

const Controller = require("egg").Controller;
const mkdirp = require("mkdirp");
const rule = {
  positions: {
    type: "array",
    itemType: "object",
    rule: {
      department: "string",
      code: { type: "string", required: false },
      name: "string",
      type: "string",
      major_type: "string",
      minor_type: "string",
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
    const filepath = await this.ctx.service.helper.createFile(
      "positions",
      "报名公告.xlsx"
    );
    const positions = this.ctx.service.helper.readXlsx(filepath);

    this.ctx.service.helper.validate(rule, { positions });
    await this.ctx.service.position.bulkCreate(positions);

    // async create temporary table if positions changed
    this.ctx.service.sync.createTempTable();

    this.ctx.body = { msg: "File has been uploaded successfully." };
    this.ctx.status = 201;
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
