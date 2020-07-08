const mkdirp = require("mkdirp");
const path = require("path");
const Service = require("egg").Service;

class PositionService extends Service {
  /**
   * Async create file from multipart file stream.
   * @return created file path
   */
  async createFile() {
    const stream = await this.ctx.getFileStream();
    const dirname = path.join(
      this.app.config.uploadPath,
      this.ctx.params.province_id,
      "positions"
    );
    const filePath = path.join(
      dirname,
      `${this.ctx.service.helper.createUniqueId()}-${
        this.ctx.params.year
      }}-招聘公告.xlsx`
    );

    mkdirp.sync(dirname);
    return await this.ctx.service.helper.saveFile(stream, filePath);
  }

  /**
   * Bulk create positions and filled with year and province id
   * @param positions positions to be created
   */
  async bulkCreate(positions) {
    await this.ctx.model.Position.destroy({
      where: {
        province_id: this.ctx.params.province_id,
        year: this.ctx.params.year,
      },
    });

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
