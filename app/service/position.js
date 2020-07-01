const Service = require("egg").Service;

class PositionService extends Service {
  /**
   * Create file from multipart file stream.
   * @return created file path
   */
  async createFile() {
    const stream = await this.ctx.getFileStream();
    const filepath = await this.ctx.service.helper.saveFile(
      stream,
      "positions",
      "招聘公告.xlsx"
    );

    await this.createPositionsByFile(filepath);
    return filepath;
  }

  /**
   * Create positions from file exists on disk.
   * @param filepath file path
   */
  async createPositionsByFile(filepath) {
    const result = this.ctx.service.helper.readXlsx(filepath);
    const after = [
      "department",
      "code",
      "name",
      "type",
      "majorType",
      "minorType",
      "recruitment",
      "phone",
      "education",
      "degree",
      "gender",
      "experience",
      "politic",
      "nation",
      "age",
      "household",
      "major",
      "remarks",
    ];

    const pre = [
      "招录单位名称",
      "职位代码",
      "职位名称",
      "职位类别",
      "职位大类",
      "职位小类",
      "招录人数",
      "咨询电话",
      "学历要求",
      "学位要求",
      "性别要求",
      "现有身份要求",
      "政治面貌要求",
      "民族要求",
      "年龄要求",
      "户籍要求",
      "专业要求",
      "备注",
    ];

    const converted = this.ctx.service.helper.changeColsNames(
      result,
      pre,
      after
    );

    this.ctx.logger.debug(converted);
  }

  async index() {}
}

module.exports = PositionService;
