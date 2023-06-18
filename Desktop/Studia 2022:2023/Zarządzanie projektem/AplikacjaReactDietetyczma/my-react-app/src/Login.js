import React, { useState } from "react";
import { login } from "./api/userService";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ login: email, password: password });
      if (response.status === 200) {
        onLogin();
      } else {
        setError("Niepoprawna nazwa użytkownika lub hasło.");
      }
    } catch (error) {
      setError("Wystąpił błąd podczas logowania.");
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="login"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default Login;
