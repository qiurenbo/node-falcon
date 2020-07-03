const position = require("../table/position");

module.exports = (app) => {
  const Position = app.model.define("position", position);

  return Position;
};
