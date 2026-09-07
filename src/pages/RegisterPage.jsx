import { useState } from "react";
import api from "../services/api";

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/register", {
                name,
                email,
                password,
            });

            alert("Registration Successful!");

            console.log(response.data);

            setName("");
            setEmail("");
            setPassword("");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;