import mongoose from "mongoose";

const ExpensesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLenght: 20,
      trim: true,
    },
    type: {
      type: String,
      default: "income",
    },
    date: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLenght: 50,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expenses", ExpensesSchema);
