import "../styles/HeroSection.css";
import heroImg from "../assets/architects-looking-plan-front-house.jpg";

export default function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="overlay"></div>

      <div className="hero-content fade-in">

        {/* TEXT */}
        <h1 className="hero-title slide-down">Your Smart Workspace</h1>
        <p className="hero-subtext slide-down delay-1">
          Manage materials, tasks, budgets & projects in one place.
        </p>

        {/* FEATURE BOXES */}
        <div className="feature-box-container slide-up delay-2">
          <div className="feature-square box1">
            <h3>Budget Safety</h3>
            <p>Control expenses and avoid overspending.</p>
          </div>

          <div className="feature-square box2">
            <h3>Material Tracking</h3>
            <p>Monitor usage, inventory & cost efficiently.</p>
          </div>
        </div>

      </div>

      {/* RIGHT WHITE BUTTON */}
      <button className="explore-btn fade-in delay-3">Explore Now →</button>

    </section>
  );
}
