// import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:8080/users/";

const requestOptions = (method, body) => {
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: body,
  };
  return requestOptions;
};

export const checkUserId = async () => {
  try {
    const userId = await localStorage.getItem("userId");
    if (userId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking userId:", error);
  }
};

export const login = async (data) => {
  try {
    const response = await fetch(
      API_URL + "login",
      requestOptions("POST", JSON.stringify(data))
    );
    const json = await response.json();
    if (response.status === 200) {
      localStorage.setItem("userId", json.userId);
      return { ...json, status: response.status };
    } else {
      return { status: response.status };
    }
  } catch (error) {
    console.error("ds " + error);
    return { error };
  }
};

export const logout = async () => {
  try {
    await localStorage.removeItem("userId");
  } catch (error) {}
};

export const register = async (data) => {
  console.log("test");
  try {
    const response = await fetch(API_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (error) {
    console.error("Error while registering:", error);
  }
};

export const caloricDemand = async (data) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      API_URL + "caloric-demand/" + userId,
      requestOptions("POST", JSON.stringify(data))
    );
    return response;
  } catch (error) {}
};

export const addToFavorite = async (meal) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      API_URL + userId + "/favorite-recipes",
      requestOptions("POST", JSON.stringify({ recipe: meal }))
    );
    return response;
  } catch (error) {}
};

export const removeFromFavorite = async (recipeId) => {
  console.log(recipeId);
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      API_URL + "favorite-recipes/" + userId + "/remove",
      requestOptions("PUT", JSON.stringify({ recipeId: recipeId }))
    );
    console.log(response);
    return response;
  } catch (error) {}
};

export const getFavorite = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(API_URL + userId + "/favoriteRecipes");

    return response;
  } catch (error) {}
};

export const getDemand = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await fetch(API_URL + userId + "/caloric-demand");

    return response;
  } catch (error) {}
};
