import { Link } from "react-router-dom";
import "../styles/NavbarLanding.css"

export default function NavbarLanding() {
  return (
    <nav className="landing-nav">
      <div className="nav-left">
        <Link to="/" className="logo">
          Const<span>Web</span>
        </Link>
      </div>

      <div className="nav-center">
        <a href="#features">Features</a>
        <a href="#overview">Overview</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>

      <div className="nav-right">
        <Link to="/login" className="login-btn">Login</Link>
      </div>
    </nav>
  );
}
