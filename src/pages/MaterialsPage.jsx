import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function MaterialsPage() {
  const { id } = useParams(); // project id
  const numericId = Number(id);

  const [materials, setMaterials] = useState([]);
  const [form, setForm] = useState({
    name: "",
    unit: "",
    quantity: "",
    unitCost: "",
  });

  // Load materials for this project
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("materials")) || {};
    setMaterials(all[numericId] || []);
  }, [numericId]);

  // Save when materials change
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("materials")) || {};
    all[numericId] = materials;
    localStorage.setItem("materials", JSON.stringify(all));
  }, [materials, numericId]);

  // Add new material
  const addMaterial = (e) => {
    e.preventDefault();

    const qty = Number(form.quantity);
    const cost = Number(form.unitCost);

    const newMaterial = {
      id: Date.now(),
      ...form,
      quantity: qty,
      unitCost: cost,
      subtotal: qty * cost,
    };

    setMaterials([...materials, newMaterial]);

    setForm({
      name: "",
      unit: "",
      quantity: "",
      unitCost: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Materials</h2>

      {/* Add Material Form */}
      <form onSubmit={addMaterial} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Material name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="text"
          placeholder="Unit (e.g. bag, kg, piece)"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="number"
          placeholder="Unit cost"
          value={form.unitCost}
          onChange={(e) => setForm({ ...form, unitCost: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <button type="submit">Add</button>
      </form>

      {/* Materials List */}
      <div style={{ marginTop: "30px" }}>
        <h3>Total Materials Cost: {materials.reduce((t, m) => t + m.subtotal, 0)}</h3>

        {materials.length === 0 ? (
          <p>No materials added yet.</p>
        ) : (
          materials.map((m) => (
            <div
              key={m.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                marginBottom: "8px",
              }}
            >
              <strong>{m.name}</strong> ({m.unit})
              <br />
              Qty: {m.quantity} × {m.unitCost}  
              <br />
              <strong>Subtotal: {m.subtotal}</strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MaterialsPage;
