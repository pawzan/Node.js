import React, { useState } from "react";
import { caloricDemand } from "./api/userService";

const Calculator = () => {
  const [calories, setCalories] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let caloriesEat = {};
    const weight = parseFloat(event.target.elements.weight.value);
    const height = parseFloat(event.target.elements.height.value);
    const gender = event.target.elements.gender.value;
    const age = parseFloat(event.target.elements.age.value);
    const activity = parseFloat(event.target.elements.activity.value);
    const goal = parseFloat(event.target.elements.goal.value);

    let bmr;
    if (gender === "male") {
      bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
    } else if (gender === "female") {
      bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
    }

    let pal;
    if (activity === 1.2) {
      pal = 1.2;
    } else if (activity === 1.375) {
      pal = 1.375;
    } else if (activity === 1.55) {
      pal = 1.55;
    } else if (activity === 1.725) {
      pal = 1.725;
    }

    let tdee;
    if (goal === 1) {
      tdee = bmr * pal * 0.8;
    } else if (goal === 2) {
      tdee = bmr * pal;
    } else if (goal === 3) {
      tdee = bmr * pal * 1.2;
    }
    const protein = 1.8 * weight;
    const fat = (calories * 0.3) / 9;

    caloriesEat = {
      calories: tdee,
      protein: protein,
      carbs: (protein + fat) / 4,
      fat: fat,
    };
    console.log(caloriesEat);

    try {
      const res = await caloricDemand(caloriesEat);
    } catch (error) {
      console.log(error);
    }

    setCalories(tdee);
  };

  return (
    <div>
      <h2>Kalkulator kalorii</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="weight">Waga (w kg):</label>
        <input
          type="number"
          min="30"
          max="300"
          name="weight"
          id="weight"
          required
        />
        <br />
        <label htmlFor="height">Wzrost (w cm):</label>
        <input
          type="number"
          min="120"
          max="280"
          name="height"
          id="height"
          required
        />
        <br />
        <label htmlFor="gender">Płeć:</label>
        <select name="gender" id="gender" required>
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
        </select>
        <br />
        <label htmlFor="age">Wiek:</label>
        <input type="number" min="5" max="130" name="age" id="age" required />
        <br />
        <label htmlFor="activity">Poziom aktywności:</label>
        <select name="activity" id="activity" required>
          <option value="1.2">Bardzo niski</option>
          <option value="1.375">Niski</option>
          <option value="1.55">Średni</option>
          <option value="1.725">Wysoki</option>
        </select>
        <br />
        <label htmlFor="goal">Cel:</label>
        <select name="goal" id="goal" required>
          <option value="1">Redukcja masy ciała (-20%)</option>
          <option value="2">Utrzymanie wagi</option>
          <option value="3">Zwiększenie masy ciała (+20%)</option>
        </select>
        <br />
        <button type="submit">Oblicz zapotrzebowanie</button>
      </form>
      {calories && (
        <p>
          Twoje dzienne zapotrzebowanie kaloryczne to: {calories.toFixed(2)}{" "}
          kcal
        </p>
      )}
    </div>
  );
};

export default Calculator;
