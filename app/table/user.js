const { UUID, STRING, DATE, UUIDV4 } = require("sequelize");
module.exports = {
  id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
  username: STRING,
  password: STRING,
  email: STRING,
  created_at: DATE,
  updated_at: DATE,
};
