import { useState } from "react";
import "../styles/ServicesCarousel.css";

import projectImg from "../assets/architectural-design-tablet-modern-house-plan.jpg";
import dashboardImg from "../assets/view-modern-construction-site.jpg";
import materialsImg from "../assets/couple-choosing-fabric-furniture-store.jpg";
import tasksImg from "../assets/view-modern-construction-site.jpg";
import reportsImg from "../assets/business-owner-working-their-strategy.jpg";

export default function ServicesCarousel() {
  const services = [
    {
      title: "Projects",
      subtitle: "Organize, monitor & execute projects professionally",
      desc: `Handle every stage of your project without confusion. From planning, budgeting, 
      scheduling to assigning workers — everything is centralized so you never lose track. 
      Monitor daily progress, compare actual vs expected timelines, and maintain complete control 
      over tasks, materials, and expenses. This helps reduce delays, prevent budget leaks, 
      and ensures smooth project execution with complete transparency.`,
      btn: "Open Projects",
      link: "/projects",
      img: projectImg,
    },
    {
      title: "Dashboard",
      subtitle: "Your real-time control center for operations",
      desc: `Access a fully visual dashboard that updates automatically as your team works. 
      View expenditure flow, stock usage, task delays, upcoming deadlines, and critical project alerts. 
      Every important metric is displayed in a clean, easy-to-understand format so you can 
      make decisions faster and identify problems before they become costly. Ideal for managers 
      who want a complete snapshot of operations at any moment.`,
      btn: "Go to Dashboard",
      link: "/dashboard",
      img: dashboardImg,
    },
    {
      title: "Materials",
      subtitle: "Track quantities, prices, suppliers & wastage",
      desc: `Keep complete control over materials from purchase to consumption. The system helps you 
      monitor live stock, supplier pricing, wastage percentages, and reorder needs. You can identify 
      which materials are overused, which areas are leaking money, and which purchases can be optimized. 
      Prevent material loss, avoid shortages, and maintain accurate records for every unit.`,
      btn: "View Materials",
      link: "/materials",
      img: materialsImg,
    },
    {
      title: "Tasks",
      subtitle: "Assign, track & automate your daily workflow",
      desc: `Break your project into structured tasks and assign them to teams or individuals. 
      Monitor deadlines, track completion percentages, add notes, and get alerts for overdue work. 
      This ensures everyone stays aligned, reduces communication errors, and helps the entire team 
      move in sync without bottlenecks. A perfect tool for smooth coordination.`,
      btn: "View Tasks",
      link: "/tasks",
      img: tasksImg,
    },
    {
      title: "Reports",
      subtitle: "Generate professional reports in one click",
      desc: `Create export-ready project reports including cost summaries, material flow charts, 
      team performance, timeline progress, and budget usage. The system compiles real data into a 
      clean, presentable format that is ideal for clients, managers, and record-keeping. Save time, 
      increase transparency, and maintain accurate documentation effortlessly.`,
      btn: "View Reports",
      link: "/reports",
      img: reportsImg,
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % services.length);
  const prev = () => setIndex((prev) => (prev - 1 + services.length) % services.length);

  const current = services[index];

  return (
    <section className="service-carousel-wrapper">
      <div className="carousel-card">
        
        {/* LEFT IMAGE */}
        <div className="carousel-left">
          <img src={current.img} className="service-image" alt="service" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="carousel-right">
          <h2 className="service-title">{current.title}</h2>
          <h3 className="service-subtitle">{current.subtitle}</h3>
          <p className="service-desc">{current.desc}</p>

          <a href={current.link} className="service-btn">
            {current.btn}
          </a>
        </div>

        {/* ARROWS */}
        <button className="arrow left" onClick={prev}>❮</button>
        <button className="arrow right" onClick={next}>❯</button>
      </div>

      {/* DOTS */}
      <div className="carousel-dots">
        {services.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
