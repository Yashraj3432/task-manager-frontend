import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../services/api";

function DashboardPage() {
    const navigate = useNavigate();

    // Logged in user
    const user = JSON.parse(localStorage.getItem("user"));

    // Protect this page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const projectResponse = await api.get("/projects");
            setProjects(projectResponse.data);

            let allTasks = [];

            for (const project of projectResponse.data) {
                const taskResponse = await api.get(
                    `/tasks/project/${project.id}`
                );
                allTasks = [...allTasks, ...taskResponse.data];
            }

            setTasks(allTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const completed = tasks.filter(
        (task) => task.status === "DONE"
    ).length;

    const pending = tasks.filter(
        (task) => task.status !== "DONE"
    ).length;

    return (
        <div className="container page">
            {/* Hero Section */}
            <div className="hero">
                <div>
                    <h1>Welcome, {user.name} 👋</h1>
                    <p>Manage your projects and track your productivity</p>
                </div>

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>

            {/* Statistics */}
            <div className="stats">
                <div className="stat-card">
                    <div className="stat-title">Projects</div>
                    <div className="stat-number">{projects.length}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Total Tasks</div>
                    <div className="stat-number">{tasks.length}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Completed</div>
                    <div className="stat-number">{completed}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-title">Pending</div>
                    <div className="stat-number">{pending}</div>
                </div>
            </div>

            {/* Recent Projects */}
            <div className="card recent-projects">
                <h2 style={{ marginBottom: "18px" }}>Recent Projects</h2>

                {projects.length === 0 ? (
                    <p>No projects available.</p>
                ) : (
                    projects.map((project) => (
                        <div className="project-item" key={project.id}>
                            <div>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </div>

                            <span className="badge">Active</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DashboardPage;