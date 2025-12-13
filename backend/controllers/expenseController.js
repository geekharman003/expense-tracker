const { where } = require("sequelize");
const Expense = require("../models/expense");

const getAllExpenses = async (req, res) => {
  try {
    const expensess = await Expense.findAll({ raw: true });
    if (!expensess) {
      res.status(404).send("no expense found");
    }

    res.status(200).json(expensess);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const addExpense = async (req, res) => {
  try {
    const { expenseAmount, expenseDescription, expenseCategory } = req.body;

    if (!expenseAmount || !expenseDescription || !expenseCategory) {
      res
        .status(400)
        .send(
          "expenseAmount,expenseDescription and expenseCategory are required"
        );
    }

    const expense = await Expense.create({
      expenseAmount,
      expenseCategory,
      expenseDescription,
    });

    const expenseId = expense.toJSON().id;

    res.status(201).send(expenseId);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.destroy({
      where: {
        id: id,
      },
    });

    if (!expense) {
      res.status(404).send("expense not found");
    }

    res.status(200).send("expense deleted successfully");
  } catch (error) {
    res.status(500).send(e.message);
  }
};

const getExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);

    if (!expense) {
      res.status(404).send("expense not found");
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { expenseAmount, expenseDescription, expenseCategory } = req.body;
    if (!expenseAmount || !expenseDescription || !expenseCategory) {
      res
        .status(400)
        .send(
          "expenseAmount, expenseDescription and expenseCategory is required"
        );
    }
    
    await Expense.update(
      {
        expenseAmount,
        expenseDescription,
        expenseCategory,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).send("expense updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllExpenses,
  getExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
