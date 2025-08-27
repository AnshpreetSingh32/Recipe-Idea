const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMealsByIngredient(ingredient) {
  const query = (ingredient || "").trim();
  if (!query) {
    return [];
  }
  const url = `${BASE_URL}/filter.php?i=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return Array.isArray(data?.meals) ? data.meals : [];
}

export async function searchMealsByName(name) {
  const query = (name || "").trim();
  if (!query) {
    return [];
  }
  const url = `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals : [];
}

export async function searchMealsByFirstLetter(letter) {
  const query = (letter || "").trim().toLowerCase();
  if (!query || query.length !== 1) {
    return [];
  }
  const url = `${BASE_URL}/search.php?f=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals : [];
}

export async function getRandomMeal() {
  const url = `${BASE_URL}/random.php`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals[0] : null;
}

export async function getMealById(id) {
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals[0] : null;
}

export async function getCategories() {
  const url = `${BASE_URL}/categories.php`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.categories) ? data.categories : [];
}

export async function getAreas() {
  const url = `${BASE_URL}/list.php?a=list`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals : [];
}

export async function getIngredients() {
  const url = `${BASE_URL}/list.php?i=list`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals : [];
}

export async function filterMealsByCategory(category) {
  const query = (category || "").trim();
  if (!query) {
    return [];
  }
  const url = `${BASE_URL}/filter.php?c=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals : [];
}

export async function filterMealsByArea(area) {
  const query = (area || "").trim();
  if (!query) {
    return [];
  }
  const url = `${BASE_URL}/filter.php?a=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals : [];
}


