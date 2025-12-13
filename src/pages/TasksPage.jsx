import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TasksPage() {
  const { id } = useParams();
  const numericId = Number(id);

  const [phases, setPhases] = useState([]);
  const [phaseForm, setPhaseForm] = useState({ name: "" });

  const [taskForm, setTaskForm] = useState({
    phaseId: "",
    title: "",
    assignee: "",
    dueDate: "",
    status: "Not Started",
  });

  // Load phases from localStorage
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("phases")) || {};
    setPhases(all[numericId] || []);
  }, [numericId]);

  // Save phases when changed
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("phases")) || {};
    all[numericId] = phases;
    localStorage.setItem("phases", JSON.stringify(all));
  }, [phases, numericId]);

  // Add new phase
  const addPhase = (e) => {
    e.preventDefault();

    const newPhase = {
      id: Date.now(),
      name: phaseForm.name,
      tasks: [],
    };

    setPhases([...phases, newPhase]);
    setPhaseForm({ name: "" });
  };

  // Add new task to a phase
  const addTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: taskForm.title,
      assignee: taskForm.assignee,
      dueDate: taskForm.dueDate,
      status: taskForm.status,
    };

    const updated = phases.map((p) =>
      p.id === Number(taskForm.phaseId)
        ? { ...p, tasks: [...p.tasks, newTask] }
        : p
    );

    setPhases(updated);

    setTaskForm({
      phaseId: "",
      title: "",
      assignee: "",
      dueDate: "",
      status: "Not Started",
    });
  };

  // Calculate phase completion
  const getProgress = (phase) => {
    if (phase.tasks.length === 0) return 0;

    const completed = phase.tasks.filter((t) => t.status === "Done").length;

    return Math.round((completed / phase.tasks.length) * 100);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Phases & Tasks</h2>

      {/* Add Phase */}
      <h3 style={{ marginTop: "20px" }}>Add Phase</h3>
      <form onSubmit={addPhase}>
        <input
          type="text"
          placeholder="Phase name (e.g. Foundation)"
          value={phaseForm.name}
          onChange={(e) => setPhaseForm({ name: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />
        <button type="submit">Add Phase</button>
      </form>

      {/* Add Task */}
      <h3 style={{ marginTop: "40px" }}>Add Task</h3>
      <form onSubmit={addTask}>
        <select
          value={taskForm.phaseId}
          onChange={(e) => setTaskForm({ ...taskForm, phaseId: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        >
          <option value="">Select Phase</option>
          {phases.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Task name"
          value={taskForm.title}
          onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="text"
          placeholder="Assignee"
          value={taskForm.assignee}
          onChange={(e) => setTaskForm({ ...taskForm, assignee: e.target.value })}
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <input
          type="date"
          value={taskForm.dueDate}
          onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
          required
          style={{ marginRight: "10px", padding: "6px" }}
        />

        <select
          value={taskForm.status}
          onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
          style={{ marginRight: "10px", padding: "6px" }}
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {/* Phase List */}
      <div style={{ marginTop: "40px" }}>
        {phases.length === 0 ? (
          <p>No phases yet.</p>
        ) : (
          phases.map((p) => (
            <div
              key={p.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <h3>
                {p.name} — {getProgress(p)}%
              </h3>

              {p.tasks.length === 0 ? (
                <p>No tasks.</p>
              ) : (
                p.tasks.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      background: "#f7f7f7",
                      marginBottom: "8px",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <strong>{t.title}</strong>
                    <br />
                    Assignee: {t.assignee || "—"}
                    <br />
                    Due: {t.dueDate}
                    <br />
                    Status: {t.status}
                  </div>
                ))
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TasksPage;
