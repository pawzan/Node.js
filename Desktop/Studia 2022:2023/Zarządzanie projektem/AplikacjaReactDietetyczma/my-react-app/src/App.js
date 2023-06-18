// src/App.js
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Navigation from "./components/Navigation";
import "./styles.css";
import Calculator from "./Calculator";
import ProductsList from "./ProductsList";

const App = () => {
  const [screen, setScreen] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setScreen("login");
  };

  const handleNavigationClick = (targetScreen) => {
    setScreen(targetScreen);
  };

  return (
    <div className="container">
      <Navigation
        onLoginClick={() => handleNavigationClick("login")}
        onRegisterClick={() => handleNavigationClick("register")}
        loggedIn={loggedIn}
        onLogout={handleLogout}
        handleNavigationClick={handleNavigationClick}
      />
      {screen === "login" && <Login onLogin={handleLogin} />}
      {screen === "register" && <Register />}
      {screen === "dashboard" && <Dashboard />}
      {screen === "calculator" && <Calculator />}
      {screen === "wyszukiwarka" && <ProductsList />}
    </div>
  );
};

export default App;
