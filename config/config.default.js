/* eslint valid-jsdoc: "off" */

"use strict";
const path = require("path");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1593391807344_4353";

  // add your middleware config here
  config.middleware = ["auth", "error"];

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["http://localhost:4200"],
  };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "falcondb",
  };

  config.multipart = {
    fileSize: "10mb",
    fileExtensions: [".xlsx"],
    whitelist: [".xlsx"],
  };

  config.uploadPath = path.join(appInfo.baseDir, "upload");

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
