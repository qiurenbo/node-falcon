"use strict";
const moment = require("moment");
const path = require("path");
const Service = require("egg").Service;

class PostionService extends Service {
  async createFile() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename =
      moment(new Date()).format("YYYMMDDHHmmssSS-") + "公职人员.xlsx";

    const dirname = path.join(__dirname, "../../upload");

    await ctx.helper.writeStreamToDisk(stream, path.join(dirname, filename));
    ctx.logger.info(`Write ${filename} to ${dirname}`);
    return filename;
  }
}

module.exports = PostionService;
