import IncomeSchema from "../models/incomeModel.js";

const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = new IncomeSchema({
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
    res.status(200).json({ message: "Income added" });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  console.log(income);
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, description, date } = req.body;

  try {
    const updatedIncome = await IncomeSchema.findByIdAndUpdate(
      id,
      { title, amount, category, description, date },
      { new: true }
    );
    if (!updatedIncome) {
      return res.status(404).json({ message: "Income not found" });
    }
    res.status(200).json(updatedIncome);
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

export { addIncome, getIncomes, updateIncome, deleteIncome };
