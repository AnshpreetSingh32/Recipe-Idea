// Recipe details page for a single meal
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { getMealById } from "../utils/api";

// Main RecipeDetails component
export default function RecipeDetails() {
  // Get recipe ID from URL
  const { id } = useParams();
  // Navigation hook
  const navigate = useNavigate();
  // State for meal, loading, and error
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch recipe details when ID changes
  useEffect(() => {
    let isMounted = true;
    async function fetchMeal() {
      setError("");
      setLoading(true);
      try {
        const data = await getMealById(id);
        if (isMounted) setMeal(data);
      } catch (err) {
        if (isMounted) setError("Failed to load recipe. Please try again.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchMeal();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Extracts ingredients and measures from meal object
  const ingredients = useMemo(() => {
    if (!meal) return [];
    const items = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) {
        items.push({ ingredient: ing.trim(), measure: (measure || "").trim() });
      }
    }
    return items;
  }, [meal]);

  // Show loader, error, or not found states
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!meal) return <div className="text-center text-gray-600 py-16">Recipe not found.</div>;

  // Render the recipe details UI
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb navigation */}
      <div className="mb-6 flex items-center gap-3 text-sm text-orange-600">
        <button
          type="button"
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
          className="hover:underline transition-colors duration-200"
        >
          Home
        </button>
        <span>/</span>
        <span className="text-gray-500">{meal.strMeal}</span>
      </div>

      {/* Main content: image and summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Meal image */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-orange-300 shadow-lg">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            src={`${meal.strMealThumb}/medium`}
            alt={meal.strMeal}
            className="block w-full h-auto "
          />
        </div>

        {/* Meal title, tags, and ingredients */}
        <div className="self-center justify-center">
          <h1 className="text-4xl font-semibold">{meal.strMeal}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            {meal.strCategory && (
              <span className="inline-flex items-center rounded-full bg-orange-50 text-orange-600 px-3 py-1 border border-orange-200">{meal.strCategory}</span>
            )}
            {meal.strArea && (
              <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-600 px-3 py-1 border border-blue-200">{meal.strArea}</span>
            )}
            {meal.strTags && (
              <span className="inline-flex items-center rounded-full bg-purple-50 text-purple-600 px-3 py-1 border border-purple-200">{meal.strTags}</span>
            )}
          </div>

          {/* List of ingredients */}
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">Ingredients</h2>
          <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ingredients.map(({ ingredient, measure }, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-[#FFA233]" />
                <span>
                  <span className="font-medium">{ingredient}</span>
                  {measure && <span className="text-gray-500"> — {measure}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Instructions and external links */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900">Instructions</h2>
        <ol className="mt-2 list-decimal pl-6 space-y-2 text-gray-800">
          {String(meal.strInstructions || "")
            .split(/\r?\n+/)
            .map((line) => line.replace(/^\*\s?/, "").trim())
            .filter((line) => line.length > 0)
            .map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
        </ol>

        {/* YouTube and source links if available */}
        {(meal.strYoutube || meal.strSource) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-all duration-200 shadow-sm"
              >
                Watch on YouTube
              </a>
            )}
            {meal.strSource && (
              <a
                href={meal.strSource}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition-all duration-200 shadow-sm"
              >
                View Source
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


