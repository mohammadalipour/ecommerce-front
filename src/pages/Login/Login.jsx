// src/pages/Login/Login.jsx
import React, { useState } from "react";
import './Login.css'; // Import the CSS file

const Login = ({ setAuthData }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(process.env.REACT_APP_API_GATEWAY_URL + "api/v1/user/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Login successful:", data);
                localStorage.setItem('token', data.access_token);
                // Fetch user profile information
                fetch(process.env.REACT_APP_API_GATEWAY_URL + "api/v1/user/profile", {
                    headers: {
                        "Authorization": `Bearer ${data.access_token}`
                    }
                })
                .then((res) => res.json())
                .then((profile) => {
                    setAuthData({ token: data.access_token, profile });
                });
            })
            .catch((error) => {
                console.error('There has been a problem with your login operation:', error);
                setError(error.toString());
            });
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;