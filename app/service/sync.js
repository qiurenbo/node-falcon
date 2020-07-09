"use strict";
const Service = require("egg").Service;

class EnrollmentService extends Service {
  /**
   * Async create temporary table
   */
  async createTempTable() {
    await this.app.model.query("DROP TABLE IF EXISTS tmp_ep");
    await this.app.model.query(
      `CREATE TABLE tmp_ep AS  SELECT p.*,e.payment FROM enrollments AS e, positions AS p WHERE e.department = p.department AND e.name = p.name;`
    );
  }
}

module.exports = EnrollmentService;
