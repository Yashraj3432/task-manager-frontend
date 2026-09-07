import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));

    const hideNav =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to={user ? "/dashboard" : "/"} className="logo">
                    <div className="logo-circle">T</div>
                    TaskFlow
                </Link>

                {!hideNav && user && (
                    <div className="nav-links">
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/tasks">Tasks</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;