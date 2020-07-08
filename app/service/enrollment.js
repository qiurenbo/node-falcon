"use strict";
const mkdirp = require("mkdirp");
const Service = require("egg").Service;
const path = require("path");

class EnrollmentService extends Service {
  /**
   * Async create file from multipart file stream.
   * @return created file path
   */
  async createFile() {
    const stream = await this.ctx.getFileStream();
    const dirname = path.join(
      this.app.config.uploadPath,
      this.ctx.params.province_id,
      "enrollments"
    );

    const filePath = path.join(
      dirname,
      `${this.ctx.service.helper.createUniqueId()}-${
        this.ctx.params.year
      }-缴费公告.xlsx`
    );

    mkdirp.sync(dirname);
    return await this.ctx.service.helper.saveFile(stream, filePath);
  }

  /**
   * Bulk create enrollments and filled with year and province id
   * @param enrollments enrollments to be created
   */
  async bulkCreate(enrollments) {
    // Destroy old rows
    await this.ctx.model.Enrollment.destroy({
      where: {
        province_id: this.ctx.params.province_id,
        year: this.ctx.params.year,
      },
    });

    await this.ctx.model.Enrollment.bulkCreate(enrollments);

    // Add province and year
    await this.ctx.model.Enrollment.update(
      {
        province_id: this.ctx.params.province_id,
        year: this.ctx.params.year,
      },
      { where: { province_id: null, year: null } }
    );
  }
}

module.exports = EnrollmentService;
