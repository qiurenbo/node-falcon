"use strict";
const mkdirp = require("mkdirp");
const Service = require("egg").Service;
const path = require("path");

class EnrollmentService extends Service {
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
