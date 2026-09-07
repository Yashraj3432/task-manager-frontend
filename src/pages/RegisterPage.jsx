import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/users/register", {
                name,
                email,
                password,
            });

            alert("Registration Successful!");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>

                <p className="auth-subtitle">
                    Start managing your projects and tasks
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn-primary" type="submit">
                        Create Account
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;