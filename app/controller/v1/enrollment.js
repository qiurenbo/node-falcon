"use strict";

const Controller = require("egg").Controller;

const rule = {
  enrollments: {
    type: "array",
    itemType: "object",
    rule: {
      department: "string",
      code: { type: "string", required: false },
      name: "string",
      recruitment: "number",
      payment: "number",
    },
  },
};

class EnrollmentController extends Controller {
  /**
   * Get upload file from http request.
   */
  async upload() {
    const filepath = await this.ctx.service.enrollment.createFile();
    const enrollments = this.ctx.service.helper.readXlsx(filepath);

    this.ctx.service.helper.validate(rule, { enrollments });
    await this.ctx.service.enrollment.bulkCreate(enrollments);

    // async create temporary table if enrollments changed
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

module.exports = EnrollmentController;
