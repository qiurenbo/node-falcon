"use strict";
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const Service = require("egg").Service;
const moment = require("moment");
const uuidv4 = require("uuid").v4;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { ValidatorError } = require("../error");
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
   * Crypto string
   * @param string string to be crypto
   * @return cryptoed string
   */
  cryptoString(string) {
    return crypto
      .createHmac("sha256", this.app.config.keys)
      .update(string)
      .digest("base64");
  }

  /**
   * Create JWT
   * @param username
   * @return JWT
   */
  createJWT(username) {
    return jwt.sign({ username }, this.app.config.keys, {
      expiresIn: "7d",
    });
  }

  /**
   * Validate ctx.request.body whether in specified schema.
   * Throw ValidatorError if validate failed.
   * @param rule schema
   * @param value ctx.request.body
   */
  validate(rule, value) {
    try {
      this.ctx.validate(rule, value);
    } catch (error) {
      throw new ValidatorError(error.code, error.message, error.errors);
    }
  }
}

module.exports = HelperService;
