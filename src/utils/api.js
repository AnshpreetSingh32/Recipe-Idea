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

export async function getMealById(id) {
  const url = `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.meals) ? data.meals[0] : null;
}


