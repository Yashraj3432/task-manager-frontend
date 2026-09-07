import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Welcome, {user?.name}</h2>

            <p>Email: {user?.email}</p>

            <p>Role: {user?.role}</p>

            <button onClick={logout}>
                Logout
            </button>
        </div>
    );
}

export default DashboardPage;