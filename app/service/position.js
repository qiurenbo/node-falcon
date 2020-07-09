const Service = require("egg").Service;

class PositionService extends Service {
  /**
   * Bulk create positions and filled with year and province id
   * @param positions positions to be created
   */
  async bulkCreate(positions) {
    // Destroy old rows
    await this.ctx.model.Position.destroy({
      where: {
        province_id: this.ctx.params.province_id,
        year: this.ctx.params.year,
      },
    });

    await this.ctx.model.Position.bulkCreate(positions);

    // Add province and year
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
