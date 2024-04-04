import ExpensesSchema from "../models/expensesModel.js";

const addExpenses = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new ExpensesSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Please enter a valid amount" });
    }
    await income.save();
    res.status(200).json({ message: "Expenses added" });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  console.log(income);
};

const getExpenses = async (req, res) => {
  try {
    const incomes = await ExpensesSchema.find().sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateExpenses = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const updatedExpenses = await ExpensesSchema.findByIdAndUpdate(
      id,
      { title, amount, category, description, date },
      { new: true }
    );
    if (!updatedExpenses) {
      return res.status(404).json({ message: "Expenses not found" });
    }
    res.status(200).json(updatedExpenses);
  } catch (error) {
    console.error("Error updating expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteExpenses = async (req, res) => {
  const { id } = req.params;
  ExpensesSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Expenses deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

export { addExpenses, getExpenses, updateExpenses, deleteExpenses };
