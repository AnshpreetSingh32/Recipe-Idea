import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import { searchMealsByIngredient } from "../utils/api";
import backgroundSvg from "../assets/background.svg";

export default function Home() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  async function handleSearch(e) {
    e?.preventDefault?.();
    setError("");
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    setHasSearched(true);
    setLoading(true);
    try {
      if (trimmed) setSearchParams({ q: trimmed }); else setSearchParams({});

      // Try cache first to avoid refetch on back nav
      const cacheKey = `meals:${trimmed}`;
      const cached = trimmed ? sessionStorage.getItem(cacheKey) : null;
      if (cached) {
        setMeals(JSON.parse(cached));
        return;
      }

      const results = await searchMealsByIngredient(trimmed);
      setMeals(results);
      if (trimmed) sessionStorage.setItem(cacheKey, JSON.stringify(results));
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Restore from URL on mount or param change
  useEffect(() => {
    const q = (searchParams.get("q") || "").trim();
    if (q) {
      setQuery(q);
      // attempt to hydrate from cache immediately
      const cacheKey = `meals:${q}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setMeals(JSON.parse(cached));
        setHasSearched(true);
        return;
      }
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Search recipes by ingredients</h1>
      <p className="mt-2 text-gray-600">Start typing ingredients to find meal ideas.</p>

      <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., chicken, rice"
          className="w-full sm:flex-1 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-6">
        {error && <ErrorMessage message={error} onRetry={handleSearch} />}
        {loading && <Loader />}

        {!loading && hasSearched && meals.length === 0 && !error && (
          <div className="text-center text-gray-600 py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-lg">No recipes found. Try different ingredients.</p>
          </div>
        )}
        
        {/* Show SVG when idle or when no results after a search; hide only while loading */}
        {!loading && meals.length === 0 && !error && (
          <div className="py-10 flex items-center justify-center">
            {/* Decorative center illustration while idle */}
            <img
              src={backgroundSvg}
              alt="Search illustration"
              className="mx-auto rounded-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl"
            />
          </div>
        )}

        

        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}


