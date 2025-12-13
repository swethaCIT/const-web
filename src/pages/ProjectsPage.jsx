import React, { useState, useEffect } from "react";
import "../styles/Projects.css";

export default function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    title: "",
    subtitle: "",
    category: "",
    startDate: "",
    endDate: "",
    status: "",
    budget: "",
    clientName: "",
    priority: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (editingId) {
      const updated = projects.map((p) =>
        p.id === editingId ? { ...p, ...formData } : p
      );
      setProjects(updated);
    } else {
      const newProject = { id: Date.now(), ...formData };
      setProjects((prev) => [...prev, newProject]);
    }

    setFormData(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;

    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <div className="projects-wrapper">

      {/* BANNER */}
      <section className="projects-banner">
        <div className="banner-overlay"></div>

        <div className="banner-content">
          <h1>Projects</h1>

          <button
            className="banner-add-btn"
            onClick={() =>
              setShowForm((prev) => {
                if (prev) {
                  setEditingId(null);
                  setFormData(initialForm);
                }
                return !prev;
              })
            }
          >
            {showForm ? "Close" : "+ Add Project"}
          </button>
        </div>
      </section>

      {/* FORM */}
      <div className={`form-wrapper ${showForm ? "open" : ""}`}>
        <form className="project-form" onSubmit={handleAddOrUpdate}>

          <div className="form-row">
            <input type="text" name="title" placeholder="Project Title" value={formData.title} onChange={handleChange} />
            <input type="text" name="subtitle" placeholder="Subtitle / Location" value={formData.subtitle} onChange={handleChange} />
          </div>

          <div className="form-row">
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
            <input type="text" name="clientName" placeholder="Client Name" value={formData.clientName} onChange={handleChange} />
          </div>

          <div className="form-row">
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
          </div>

          <div className="form-row">
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>

            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option value="">Priority</option>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-row">
            <input type="number" name="budget" placeholder="Budget (₹)" value={formData.budget} onChange={handleChange} />
            <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
          </div>

          <textarea name="description" rows="4" placeholder="Project Description" value={formData.description} onChange={handleChange} />

          <button className="submit-btn" type="submit">
            {editingId ? "Save Project" : "Save Project"}
          </button>
        </form>
      </div>

      {/* PROJECT LIST */}
      <div className="project-list">

        {projects.length === 0 && (
          <p className="empty-state">No projects yet. Add one!</p>
        )}

        {projects.map((p) => (
          <div className="project-card" key={p.id}>

            <div className="card-img">
              <img src={p.image || "https://via.placeholder.com/600"} alt="project" />
            </div>

            <div className="card-content">
              <h2>{p.title}</h2>
              <p className="subtitle">{p.subtitle}</p>
              <p className="desc">{p.description}</p>

              <div className="card-row">
                <span>📌 {p.category}</span>
                <span>⭐ {p.priority}</span>
              </div>

              <div className="card-row">
                <span>👤 {p.clientName}</span>
                <span>📊 {p.status}</span>
              </div>

              <div className="card-row">
                <span>📅 {p.startDate}</span>
                <span>💰 ₹{p.budget}</span>
              </div>

              {/* MOVED HERE — BOTTOM OF CARD */}
              <div className="card-actions-bottom">
                <button onClick={() => handleEdit(p)} className="card-edit-btn">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="card-delete-btn">Delete</button>
              </div>

              <a href={`/projects/${p.id}/dashboard`} className="view-btn"> 
              View Dashboard → 
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
