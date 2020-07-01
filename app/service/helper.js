"use strict";
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const Service = require("egg").Service;
const moment = require("moment");
const uuidv4 = require("uuid").v4;

class HelperService extends Service {
  /**
   * Get absolute dirname path
   * @param category file category used as parent dir
   */
  createDirname(category) {
    return path.join(this.app.config.uploadPath, category);
  }

  /**
   * Save file to specified path
   * @param stream uploaded file stream
   * @param category file category used as parent dir
   * @param basename basename
   */
  async saveFile(stream, category, basename) {
    const filepath = this.createUniqueFilepath(
      this.createDirname(category),
      basename
    );

    // Get target filepath stream
    const writeStream = fs.createWriteStream(filepath, { flags: "w" });

    return new Promise((resolve, reject) => {
      stream.pipe(writeStream);
      writeStream.on("finish", () => {
        this.ctx.logger.debug(`Write ${filepath} to disk.`);
        resolve(filepath);
      });
    });
  }

  /**
   * load excel to memory
   * @param filePath
   * @return worksheet in json format
   */
  readXlsx(filePath) {
    this.ctx.logger.debug(`Read file from ${filePath}`);
    const wb = XLSX.readFile(filePath);
    const firstSheetName = wb.SheetNames[0];
    let ws = wb.Sheets[firstSheetName];
    return XLSX.utils.sheet_to_json(ws);
  }

  /**
   * Create unique id by combine date + uuid
   * @return unique id
   */
  createUniqueId() {
    return moment(new Date()).format("YYYMMDDHHmm") + "-" + uuidv4();
  }

  /**
   * Get unique file path: date + uuid
   * @param dirname absolute dirname path
   * @param basename basename of path
   */
  createUniqueFilepath(dirname, basename) {
    return path.join(dirname, this.createUniqueId() + "-" + basename);
  }

  /**
   * Change cols names of excel
   * TODO Optimise the efficiency
   * @param result excel parsed result
   * @param pre pre cols of excel
   * @param after after modified cols of excel
   */
  changeColsNames(result, pre, after) {
    if (pre.length !== after.length) {
      throw new Error("changeColsNames:pre must be compatible to after");
    }

    let rs = JSON.stringify(result);
    for (let i = 0; i < pre.length; i++) {
      let replace = pre[i];
      let re = new RegExp(replace, "g");
      rs = rs.replace(re, after[i]);
    }

    return JSON.parse(rs);
  }
}

module.exports = HelperService;
