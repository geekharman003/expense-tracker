const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Expense = sequelize.define("expenses", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  expenseAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expenseDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expenseCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Expense;
