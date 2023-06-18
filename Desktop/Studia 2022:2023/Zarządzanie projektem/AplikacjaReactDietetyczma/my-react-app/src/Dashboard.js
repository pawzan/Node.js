// src/Dashboard.js
import React, { useState, useEffect } from "react";
import { getFavorite, getDemand, removeFromFavorite } from "./api/userService";

const Meal = ({ meal, onDelete }) => {
  return (
    <div className="meal">
      <span>
        {meal.recipe.label +
          " (" +
          meal.recipe.nutrients.ENERC_KCAL +
          " kcal" +
          ")"}
      </span>
      <button onClick={() => onDelete(meal.recipe.foodId)}>X</button>
    </div>
  );
};

const MealList = ({ meals, onDelete }) => {
  return (
    <div className="meals">
      {meals.map((meal, index) => (
        <Meal key={index} meal={meal} onDelete={onDelete} />
      ))}
    </div>
  );
};

const Slider = ({ label, value, toEat }) => {
  return (
    <div style={{ maxWidth: "100px" }}>
      <label>{label}</label>
      <input
        type="range"
        min="0"
        max={toEat}
        value={Math.round(value)}
        readOnly
      />
      <span>{Math.round(value)}</span>
      <span>{`/${toEat}`}</span>
    </div>
  );
};

const Dashboard = () => {
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fat, setFat] = useState(0);
  const [likeFood, setLikeFood] = useState([]);
  const [caloriesToEat, setCaloriesToEat] = useState([]);
  const [mealDeleted, setMealDeleted] = useState(false);

  useEffect(() => {
    const sumProtein = likeFood.reduce(
      (total, meal) => total + meal.recipe.nutrients.PROCNT,
      0
    );
    const sumCarbs = likeFood.reduce(
      (total, meal) => total + meal.recipe.nutrients.CHOCDF,
      0
    );
    const sumCalories = likeFood.reduce(
      (total, meal) => total + meal.recipe.nutrients.ENERC_KCAL,
      0
    );
    const sumFat = likeFood.reduce(
      (total, meal) => total + meal.recipe.nutrients.FAT,
      0
    );

    setProtein(sumProtein);
    setCarbs(sumCarbs);
    setCalories(sumCalories);
    setFat(sumFat);
  }, [likeFood]);

  const deleteMeal = async (id) => {
    try {
      console.log("xd");
      await removeFromFavorite(id);
      setMealDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavoriteRecipes = async () => {
    try {
      const res = await getFavorite();
      const data = await res.json();
      if (res.status === 200) {
        setLikeFood(data);
      }
    } catch (error) {}
  };

  const getCaloricDemand = async () => {
    try {
      const res = await getDemand();
      const data = await res.json();
      if (res.status === 200) {
        setCaloriesToEat(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFavoriteRecipes();
    getCaloricDemand();
    setMealDeleted(false);
  }, [mealDeleted]);

  return (
    <div>
      <h1>Dziennik</h1>
      <MealList meals={likeFood} onDelete={(id) => deleteMeal(id)} />
      <h2>Składniki odżywcze</h2>
      <div className="slider">
        <Slider
          label="Białko"
          value={Math.round(protein)}
          toEat={Math.round(caloriesToEat.protein)}
        />
        <Slider
          label="Węglowodany"
          value={Math.round(carbs)}
          toEat={Math.round(caloriesToEat.carbs)}
        />
        <Slider
          label="Kalorie"
          value={Math.round(calories)}
          toEat={Math.round(caloriesToEat.calories)}
        />
        <Slider
          label="Tłuszcze"
          value={Math.round(fat)}
          toEat={Math.round(caloriesToEat.fat)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
