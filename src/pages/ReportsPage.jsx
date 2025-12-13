import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ReportsPage() {
  const { id } = useParams();
  const projectId = Number(id);

  const [project, setProject] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // ---- LOAD PROJECT ----
    const allProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const foundProject = allProjects.find((p) => p.id === projectId);
    setProject(foundProject);

    // ---- LOAD MATERIALS ----
    const allMaterials = JSON.parse(localStorage.getItem("materials")) || {};
    setMaterials(allMaterials[projectId] || []);

    // ---- LOAD EXPENSES ----
    const allExpenses = JSON.parse(localStorage.getItem("expenses")) || {};
    setExpenses(allExpenses[projectId] || []);

    // ---- LOAD TASKS FROM PHASES ----
    const allPhases = JSON.parse(localStorage.getItem("phases")) || {};
    const projectPhases = allPhases[projectId] || [];

    // Extract ALL TASKS from inside all phases
    const extractedTasks = projectPhases.flatMap((phase) => phase.tasks || []);
    setTasks(extractedTasks);
  }, [projectId]);

  if (!project) return <p>Project not found</p>;

  // ---- CALCULATIONS ----
  const totalMaterialCost = materials.reduce(
    (sum, m) => sum + (Number(m.subtotal) || Number(m.cost) || 0),
    0
  );

  const totalExpense = expenses.reduce(
    (sum, e) => sum + (Number(e.amount) || 0),
    0
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="page">
      <h2>Project Summary</h2>

      {/* PROJECT INFO */}
      <div className="card">
        <h3>{project.name}</h3>
        <p>Budget: {project.budget || "N/A"}</p>
      </div>

      {/* FINANCIAL SUMMARY */}
      <div className="card">
        <h3>Financial Summary</h3>
        <p><strong>Total Material Cost:</strong> ₹{totalMaterialCost}</p>
        <p><strong>Total Expenses:</strong> ₹{totalExpense}</p>
        <p><strong>Grand Total:</strong> ₹{totalMaterialCost + totalExpense}</p>
      </div>

      {/* TASK SUMMARY */}
      <div className="card">
        <h3>Task Summary</h3>
        <p><strong>Total Tasks:</strong> {totalTasks}</p>
        <p><strong>Completed:</strong> {completedTasks}</p>
        <p><strong>Progress:</strong> {progress}%</p>
      </div>
    </div>
  );
}

export default ReportsPage;
