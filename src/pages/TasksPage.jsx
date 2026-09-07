import { useEffect, useState } from "react";
import api from "../services/api";

function TasksPage() {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const loadProjects = async () => {
        const response = await api.get("/projects");
        setProjects(response.data);

        if (response.data.length > 0) {
            setSelectedProject(response.data[0].id);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            loadTasks(selectedProject);
        }
    }, [selectedProject]);

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
            priority: "MEDIUM"
        });

        setTitle("");
        setDescription("");

        loadTasks(selectedProject);
    };

    return (
        <div>
            <h1>Task Board</h1>

            <h3>Select Project</h3>

            <select
                value={selectedProject}
                onChange={(e)=>setSelectedProject(e.target.value)}
            >
                {projects.map(project => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>

            <hr />

            <h3>Create Task</h3>

            <form onSubmit={createTask}>

                <input
                    placeholder="Task title"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />

                <br/><br/>

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />

                <br/><br/>

                <button>Create Task</button>

            </form>

            <hr/>

            <h2>Tasks</h2>

            {tasks.map(task => (

                <div key={task.id}>

                    <h3>{task.title}</h3>

                    <p>{task.description}</p>

                    <p>Status: {task.status}</p>

                    <p>Priority: {task.priority}</p>

                    <hr/>

                </div>

            ))}

        </div>
    );
}

export default TasksPage;