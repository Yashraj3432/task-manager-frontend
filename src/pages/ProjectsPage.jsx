import { useEffect, useState } from "react";
import api from "../services/api";

function ProjectsPage() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [projects, setProjects] = useState([]);

    const loadProjects = async () => {
        const response = await api.get("/projects");
        setProjects(response.data);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.post("/projects", {
            name,
            description,
        });

        setName("");
        setDescription("");

        loadProjects();
    };

    return (
        <div>
            <h1>Projects</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Project Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <br/><br/>

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />

                <br/><br/>

                <button>Create Project</button>
            </form>

            <hr/>

            {projects.map(project => (
                <div key={project.id}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
            ))}

        </div>
    );
}

export default ProjectsPage;