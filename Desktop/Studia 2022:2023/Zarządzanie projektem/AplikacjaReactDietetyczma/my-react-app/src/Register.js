import React, { useState } from "react";
import { register } from "./api/userService";

const Register = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    repeat_password: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.login === "" ||
      formData.password === "" ||
      formData.repeat_password === "" ||
      formData.email === ""
    ) {
      setErrorMessage("Wypełnij wszystkie pola.");
      return;
    }

    if (formData.password !== formData.repeat_password) {
      setErrorMessage("Hasła się nie zgadzają.");
      return;
    }

    try {
      const res = await register(formData);
      if (res && res.status === 200) {
        console.log(res);
        return 0;
      } else {
        console.log("xd");
      }
    } catch (error) {
      console.log(error);
    }

    // Czyszczenie pól formularza
    setFormData({
      login: "",
      password: "",
      repeat_password: "",
      email: "",
    });

    // Wyczyszczenie komunikatu o błędzie
    setErrorMessage("");
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">Login:</label>
        <input
          type="login"
          name="login"
          id="login"
          value={formData.login}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="repeat_password">Powtórz hasło:</label>
        <input
          type="password"
          name="repeat_password"
          id="repeat_password"
          value={formData.repeat_password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;
