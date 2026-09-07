import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/login", {
                email,
                password,
            });

            localStorage.setItem("user", JSON.stringify(response.data));
            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1 className="auth-title">Welcome Back</h1>

                <p className="auth-subtitle">
                    Login to continue managing your projects
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn-primary" type="submit">
                        Login
                    </button>

                </form>

                <div className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </div>

            </div>

        </div>
    );
}

export default LoginPage;