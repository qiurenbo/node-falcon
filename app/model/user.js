const user = require("../table/user");

module.exports = (app) => {
  const User = app.model.define("user", user);

  return User;
};
