import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container nav-content">

                <Link to="/" className="logo">
                    <div className="logo-circle">T</div>
                    TaskFlow
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/tasks">Tasks</Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;