const Service = require("egg").Service;

class PositionService extends Service {
  /**
   * Async create file from multipart file stream.
   * @return created file path
   */
  async createFile() {
    const stream = await this.ctx.getFileStream();
    return await this.ctx.service.helper.saveFile(
      stream,
      "positions",
      "招聘公告.xlsx"
    );
  }

  /**
   * Bulk create positions and filled with year and province id
   * @param positions positions to be created
   */
  async bulkCreate(positions) {
    await this.ctx.model.Position.bulkCreate(positions);
    await this.ctx.model.Position.update(
      {
        province_id: this.ctx.params.province_id,
        year: this.ctx.params.year,
      },
      { where: { province_id: null, year: null } }
    );
  }

  async index() {}
}

module.exports = PositionService;
