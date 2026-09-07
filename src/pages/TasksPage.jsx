import { useEffect, useState } from "react";
import api from "../services/api";

function TasksPage() {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");

    useEffect(() => {
        loadProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            loadTasks(selectedProject);
        }
    }, [selectedProject]);

    const loadProjects = async () => {
        const response = await api.get("/projects");

        setProjects(response.data);

        if (response.data.length > 0) {
            setSelectedProject(response.data[0].id);
        }
    };

    const loadTasks = async (projectId) => {
        const response = await api.get(`/tasks/project/${projectId}`);
        setTasks(response.data);
    };

    const createTask = async (e) => {
        e.preventDefault();

        await api.post(`/tasks/${selectedProject}`, {
            title,
            description,
            status: "TODO",
            priority,
        });

        setTitle("");
        setDescription("");
        setPriority("MEDIUM");

        await loadTasks(selectedProject);
    };

    // UI only (Backend PATCH in next lesson)
    const updateStatus = async (taskId, newStatus) => {
        try {
            await api.patch(`/tasks/${taskId}/status`, {
                status: newStatus,
            });

            await loadTasks(selectedProject);

        } catch (error) {
            console.error(error);
            alert("Unable to update task status");
        }
    };

    const todo = tasks.filter((t) => t.status === "TODO");
    const progress = tasks.filter((t) => t.status === "IN_PROGRESS");
    const done = tasks.filter((t) => t.status === "DONE");

    const renderTask = (task) => (
        <div className="task-card" key={task.id}>
            <h4>{task.title}</h4>

            <p>{task.description}</p>

            <span className={`priority ${task.priority.toLowerCase()}`}>
        {task.priority}
      </span>

            <select
                className="task-status"
                value={task.status}
                onChange={(e) => updateStatus(task.id, e.target.value)}
            >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
        </div>
    );

    return (
        <div className="container page">
            <div className="page-header">
                <h1>Task Board</h1>
                <p>Organize and track work across your projects</p>
            </div>

            <div className="card">
                <div className="task-controls">
                    <select
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(Number(e.target.value))}
                    >
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <form className="task-controls" onSubmit={createTask}>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>

                    <button className="btn-primary" type="submit">
                        Add Task
                    </button>
                </form>
            </div>

            <div className="board">
                <div className="column">
                    <div className="column-title">
                        <span>📝 Todo</span>
                        <span>{todo.length}</span>
                    </div>

                    {todo.map(renderTask)}
                </div>

                <div className="column">
                    <div className="column-title">
                        <span>🚀 In Progress</span>
                        <span>{progress.length}</span>
                    </div>

                    {progress.map(renderTask)}
                </div>

                <div className="column">
                    <div className="column-title">
                        <span>✅ Done</span>
                        <span>{done.length}</span>
                    </div>

                    {done.map(renderTask)}
                </div>
            </div>
        </div>
    );
}

export default TasksPage;