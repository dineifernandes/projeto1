const Sequelize = require("sequelize");

const connection = new Sequelize("nodejs", "root", "724018", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
