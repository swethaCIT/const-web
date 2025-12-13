import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Dashboard.css";

export default function DashboardPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects")) || [];
    const found = saved.find((p) => String(p.id) === String(id));
    setProject(found);
  }, [id]);

  if (!project) {
    return (
      <h2 style={{ padding: "120px", textAlign: "center" }}>
        Project not found
      </h2>
    );
  }

  /* 🔢 TIMELINE CALCULATION */
  const start = new Date(project.startDate);
  const end = new Date(project.endDate);
  const today = new Date();

  const totalDays = Math.max(
    1,
    Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  );

  const completedDays = Math.min(
    totalDays,
    Math.max(
      0,
      Math.ceil((today - start) / (1000 * 60 * 60 * 24))
    )
  );

  const progressPercent = Math.min(
    100,
    Math.round((completedDays / totalDays) * 100)
  );

  return (
    <div className="dashboard-wrapper">

      {/* 🔶 DASHBOARD BANNER */}
      <section
        className="dashboard-banner"
        style={{
          backgroundImage: `url(${project.image || "https://via.placeholder.com/900"})`,
        }}
      >
        <div className="banner-overlay"></div>

        <div className="banner-content">
          <h1>{project.title}</h1>
          <p className="owner-info">
            👤 {project.clientName || "Unknown Client"} <br />
            📍 {project.subtitle || "No Address"} <br />
            🗂 Category: {project.category || "N/A"} <br />
            ⭐ Priority: {project.priority || "Normal"}
          </p>
        </div>
      </section>

      {/* 🔶 OVERVIEW CARDS */}
      <section className="overview-section">

        <div className="overview-card">
          <h3>Status</h3>
          <p className="big-text">{project.status || "Not Set"}</p>
        </div>

        <div className="overview-card">
          <h3>Budget</h3>
          <p className="big-text">₹{project.budget || 0}</p>
        </div>

        <div className="overview-card">
          <h3>Start Date</h3>
          <p>{project.startDate || "-"}</p>
        </div>

        <div className="overview-card">
          <h3>End Date</h3>
          <p>{project.endDate || "-"}</p>
        </div>

        {/* 🔥 MODERN TIMELINE PROGRESS */}
<div className="timeline-card-modern">

  <div
    className="progress-ring"
    style={{
      background: `conic-gradient(
        #f97316 ${progressPercent * 3.6}deg,
        #e5e7eb 0deg
      )`,
    }}
  >
    <div className="progress-center">
      <h2>{progressPercent}%</h2>
      <p>Completed</p>
    </div>
  </div>

  <div className="timeline-info">
    <h3>Timeline Progress</h3>

    <p className="days-info">
      ⏳ {completedDays} of {totalDays} days
    </p>

    <div className="date-row">
      <span>📅 {project.startDate}</span>
      <span>📅 {project.endDate}</span>
    </div>

    <span
      className={`status-badge ${
        progressPercent >= 100
          ? "completed"
          : progressPercent >= 80
          ? "ontrack"
          : "delayed"
      }`}
    >
      {progressPercent >= 100
        ? "Completed"
        : progressPercent >= 80
        ? "On Track"
        : "Delayed"}
    </span>
  </div>

</div>


      </section>

      {/* 🔶 DESCRIPTION */}
      <section className="details-section">
        <h2>Project Description</h2>
        <p>{project.description || "No description provided."}</p>
      </section>

      {/* 🔶 PLACEHOLDER FOR CHARTS */}
      <section className="charts-section">
        <h2>Analytics & Progress</h2>
        <div className="chart-placeholder">
          Charts (Tasks, Expenses, Materials) will appear here
        </div>
      </section>

    </div>
  );
}
