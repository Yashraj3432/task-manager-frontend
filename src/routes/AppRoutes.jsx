import { Routes, Route } from "react-router-dom";
import Navbar from "../pages/Navbar.jsx";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
        </Routes>
    );
}

export default AppRoutes;