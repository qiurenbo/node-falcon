const { UUID, STRING, DATE, INTEGER, UUIDV4 } = require("sequelize");
module.exports = {
  id: { type: UUID, defaultValue: UUIDV4, primaryKey: true },
  department: STRING,
  code: STRING,
  name: STRING,
  recruitment: INTEGER,
  payment: INTEGER,
  created_at: DATE,
  updated_at: DATE,
  province_id: STRING,
  year: STRING,
};
