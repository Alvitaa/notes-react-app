import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
    const { login } = useUser();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(username, password);
            navigate("/");
        } catch {
            setError("Invalid username or password.");
            console.log(error);
        }
    };

    return (
        <div className="login">
            <div className="App-title">
                <h1>Note-taking App</h1>
                <h3>By Juan Alva</h3>
            </div>
            <div className="login-container">
                <h2>Welcome back!</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    Username
                    <input
                        type="text"
                        placeholder="Input username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    Password
                    <input
                        type="password"
                        placeholder="Input password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
