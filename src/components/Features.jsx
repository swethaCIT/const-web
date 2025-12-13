import "../styles/FeatureSection.css";
import { FaTools, FaBoxes, FaMoneyBillWave, FaChartLine } from "react-icons/fa";

export default function FeatureSection() {
  return (
    <section className="feature-wrapper">

      {/* Outer Big Card */}
      <div className="feature-big-card">

        <h2 className="feature-main-title">Everything You Need In One Platform</h2>
        <p className="feature-main-sub">
          Manage your entire construction workflow with ease and precision.
        </p>

        {/* Inner Small Feature Cards */}
        <div className="feature-grid">

          <div className="feature-card">
            <FaTools className="feature-icon" />
            <h3>Task Management</h3>
            <p>Assign, track, and complete tasks with real-time updates.</p>
          </div>

          <div className="feature-card">
            <FaBoxes className="feature-icon" />
            <h3>Material Tracking</h3>
            <p>Monitor inventory, usage, and availability instantly.</p>
          </div>

          <div className="feature-card">
            <FaMoneyBillWave className="feature-icon" />
            <h3>Budget Control</h3>
            <p>Stay within limits using automated budget insights.</p>
          </div>

          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Project Analytics</h3>
            <p>Track progress, performance, and deadlines visually.</p>
          </div>

        </div>
      </div>

    </section>
  );
}
