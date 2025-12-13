const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("userexpenses", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
  } catch (error) {
    console.log(error.message);
  }
})();

module.exports = sequelize;
