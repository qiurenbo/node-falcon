const enrollment = require("../table/enrollment");

module.exports = (app) => {
  const Position = app.model.define("enrollment", enrollment);

  return Position;
};
