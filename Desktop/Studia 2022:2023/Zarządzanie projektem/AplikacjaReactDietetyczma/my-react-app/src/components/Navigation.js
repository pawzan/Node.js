// src/components/Navigation.js
import React from "react";

const Navigation = ({
  onLoginClick,
  onRegisterClick,
  loggedIn,
  onLogout,
  handleNavigationClick,
}) => {
  return (
    <nav>
      {!loggedIn ? (
        <>
          <button onClick={onLoginClick}>Logowanie</button>
          <button onClick={onRegisterClick}>Rejestracja</button>
        </>
      ) : (
        <>
          <button onClick={() => onLogout()}>Wyloguj się</button>
          <button onClick={() => handleNavigationClick("dashboard")}>
            Dziennik
          </button>
          <button onClick={() => handleNavigationClick("calculator")}>
            Kalkulator kalorii
          </button>
          <button onClick={() => handleNavigationClick("wyszukiwarka")}>
            Wyszukiwarka posiłku
          </button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
