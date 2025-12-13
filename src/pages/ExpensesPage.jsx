import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ExpensesPage() {
  const { id } = useParams(); // project id
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    item: "",
    category: "",
    amount: "",
    date: "",
  });

  // Load expenses for this project
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("expenses")) || {};
    setExpenses(all[Number(id)] || []);
  }, [id]);

  // Save whenever expenses change
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("expenses")) || {};
    all[Number(id)] = expenses;
    localStorage.setItem("expenses", JSON.stringify(all));
  }, [expenses, id]);

  // Add new expense
  const addExpense = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    setExpenses([...expenses, newExpense]);

    setForm({
      item: "",
      category: "",
      amount: "",
      date: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expenses</h2>

      {/* Add Expense Form */}
      <form onSubmit={addExpense} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Item"
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <button type="submit">Add</button>
      </form>

      {/* Expense List */}
      <div style={{ marginTop: "30px" }}>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          expenses.map((ex) => (
            <div
              key={ex.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                marginBottom: "8px",
              }}
            >
              <strong>{ex.item}</strong> — {ex.category}  
              <br />
              Amount: {ex.amount}  
              <br />
              Date: {ex.date}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExpensesPage;
