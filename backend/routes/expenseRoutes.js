const express = require("express");
const expenseController = require("../controllers/expenseController");
const router = express.Router();

router.get("/", expenseController.getAllExpenses);
router.get("/:id", expenseController.getExpense);
router.post("/add", expenseController.addExpense);
router.put("/update/:id",expenseController.updateExpense)
router.delete("/delete/:id", expenseController.deleteExpense);

module.exports = router;
