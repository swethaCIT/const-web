import { Routes, Route } from 'react-router-dom';

import LandingPage from "./pages/LandingPage";
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import MaterialsPage from './pages/MaterialsPage';
import TasksPage from './pages/TasksPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="/projects/:id/dashboard" element={<DashboardPage />} />
        <Route path="/projects/:id/expenses" element={<ExpensesPage />} />
        <Route path="/projects/:id/materials" element={<MaterialsPage />} />
        <Route path="/projects/:id/tasks" element={<TasksPage />} />
        <Route path="/projects/:id/reports" element={<ReportsPage />} />

        <Route path="/settings" element={<SettingsPage />} />

        {/* fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
