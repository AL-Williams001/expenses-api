import express from "express";
import {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
} from "../controllers/income.js";
import {
  addExpenses,
  getExpenses,
  updateExpenses,
  deleteExpenses,
} from "../controllers/expenses.js";

const router = express.Router();

router
  .post("/add-income", addIncome)
  .get("/get-incomes", getIncomes)
  .put("/update-income/:id", updateIncome)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expenses", addExpenses)
  .get("/get-expenses", getExpenses)
  .put("/update-expenses/:id", updateExpenses)
  .delete("/delete-expenses/:id", deleteExpenses);

export default router;
