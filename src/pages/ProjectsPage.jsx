import { useEffect, useState } from "react";
import api from "../services/api";

function ProjectsPage() {

    const [projects,setProjects]=useState([]);

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");

    const loadProjects=async()=>{

        const response=await api.get("/projects");

        setProjects(response.data);

    };

    useEffect(()=>{

        loadProjects();

    },[]);

    const handleSubmit=async(e)=>{

        e.preventDefault();

        await api.post("/projects",{
            name,
            description
        });

        setName("");
        setDescription("");

        loadProjects();

    };

    return(

        <div className="container page">

            <div className="page-header">

                <h1>Projects</h1>

                <p>Create and organize your workspaces</p>

            </div>

            <form
                className="project-form"
                onSubmit={handleSubmit}
            >

                <input
                    placeholder="Project name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                />

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />

                <button className="btn-primary">
                    Create
                </button>

            </form>

            <div className="project-grid">

                {projects.map(project=>(

                    <div
                        className="project-card"
                        key={project.id}
                    >

                        <h3>{project.name}</h3>

                        <p>{project.description}</p>

                        <div className="project-footer">

              <span className="project-id">
                #{project.id}
              </span>

                            <span className="badge">
                Active
              </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ProjectsPage;