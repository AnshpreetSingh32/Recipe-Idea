// React and hooks
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// UI components
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";
import AdvancedFilters from "../components/AdvancedFilters";
import MealSuggestions from "../components/MealSuggestions";
// API helpers and assets
import { 
  searchMealsByIngredient, 
  searchMealsByName, 
  getRandomMeal,
  filterMealsByCategory,
  filterMealsByArea
} from "../utils/api";
import backgroundSvg from "../assets/background.svg";

// Main Home page component
export default function Home() {
  // Search input value
  const [query, setQuery] = useState("");
  // List of meals to show
  const [meals, setMeals] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(false);
  // Error message
  const [error, setError] = useState("");
  // Tracks if user has searched
  const [hasSearched, setHasSearched] = useState(false);
  // URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  // Selected filters for advanced search
  const [selectedFilters, setSelectedFilters] = useState({});
  // Stores a random meal
  const [randomMeal, setRandomMeal] = useState(null);

  // Smart search detection - if query contains common ingredients, search by ingredients, otherwise by name
  // Checks if query is ingredient or meal name
  const detectSearchType = (searchQuery) => {
    const commonIngredients = [
      'chicken', 'beef', 'pork', 'fish', 'rice', 'pasta', 'tomato', 'onion', 'garlic',
      'potato', 'carrot', 'broccoli', 'spinach', 'mushroom', 'cheese', 'egg', 'milk',
      'flour', 'sugar', 'salt', 'pepper', 'oil', 'butter', 'lemon', 'lime', 'herbs'
    ];
    
    const queryWords = searchQuery.toLowerCase().split(/[,\s]+/);
    const hasIngredients = queryWords.some(word => commonIngredients.includes(word.trim()));
    
    return hasIngredients ? 'ingredients' : 'name';
  };

  // Handles search form submit
  async function handleSearch(e) {
    e?.preventDefault?.();
    setError("");
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }
    
    const searchType = detectSearchType(trimmed);
    setHasSearched(true);
    setLoading(true);
    
    try {
      if (trimmed) setSearchParams({ q: trimmed, type: searchType }); else setSearchParams({});

      // remember last query to help restore state when navigating home
      if (trimmed) sessionStorage.setItem("lastQuery", trimmed);

      // Try cache first to avoid refetch on back nav
      const cacheKey = `meals:${trimmed}:${searchType}`;
      const cached = trimmed ? sessionStorage.getItem(cacheKey) : null;
      if (cached) {
        setMeals(JSON.parse(cached));
        return;
      }

      const results = searchType === "ingredients" 
        ? await searchMealsByIngredient(trimmed)
        : await searchMealsByName(trimmed);
      
      setMeals(results);
      if (trimmed) sessionStorage.setItem(cacheKey, JSON.stringify(results));
    } catch (err) {
      setError("Failed to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Fetches a random meal
  async function handleRandomMeal() {
    setLoading(true);
    setError("");
    try {
      const meal = await getRandomMeal();
      setRandomMeal(meal);
      setMeals(meal ? [meal] : []);
      // Persist random meal so breadcrumbs/back can restore
      try {
        sessionStorage.setItem("randomMeal", JSON.stringify(meal));
      } catch (e) {}
      setHasSearched(true);
      setSearchParams({ random: "true" });
    } catch (err) {
      setError("Failed to fetch random meal. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Handles filter changes and fetches filtered meals
  async function handleFilterChange(newFilters) {
    setSelectedFilters(newFilters);
    
    // If no filters are selected, clear results
    if (Object.values(newFilters).every(filters => !filters || filters.length === 0)) {
      setMeals([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    try {
      let allResults = [];
      
      // Collect results from all active filters
      if (newFilters.categories?.length > 0) {
        for (const category of newFilters.categories) {
          const results = await filterMealsByCategory(category);
          allResults = [...allResults, ...results];
        }
      }
      
      if (newFilters.areas?.length > 0) {
        for (const area of newFilters.areas) {
          const results = await filterMealsByArea(area);
          allResults = [...allResults, ...results];
        }
      }
      
      if (newFilters.ingredients?.length > 0) {
        for (const ingredient of newFilters.ingredients) {
          const results = await searchMealsByIngredient(ingredient);
          allResults = [...allResults, ...results];
        }
      }

      // Remove duplicates based on meal ID
      const uniqueResults = allResults.filter((meal, index, self) => 
        index === self.findIndex(m => m.idMeal === meal.idMeal)
      );

      setMeals(uniqueResults);
      setHasSearched(true);
      // Persist filters and results for breadcrumb restoration
      try {
        sessionStorage.setItem("filtersResults", JSON.stringify(uniqueResults));
        sessionStorage.setItem("filtersSelected", JSON.stringify(newFilters));
      } catch (e) {}
      setSearchParams({ filters: "true" });
    } catch (err) {
      setError("Failed to apply filters. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Called when a meal is selected from suggestions
  const handleMealSelect = (meal) => {
    setMeals([meal]);
    setHasSearched(true);
    setSearchParams({ meal: meal.idMeal });
    // Persist selected meal to restore on back
    try {
      sessionStorage.setItem(`meal:${meal.idMeal}`, JSON.stringify(meal));
    } catch (e) {}
  };

  // Restore from URL on mount or param change
  // Restores state from URL or session on mount
  useEffect(() => {
    const q = (searchParams.get("q") || "").trim();
    const type = searchParams.get("type") || "ingredients";
    const random = searchParams.get("random");
    const filtersFlag = searchParams.get("filters");
    const mealId = searchParams.get("meal");

    if (random === "true") {
      // Handle random meal restoration
      const cachedRandom = sessionStorage.getItem("randomMeal");
      if (cachedRandom) {
        const meal = JSON.parse(cachedRandom);
        setRandomMeal(meal);
        setMeals([meal]);
        setHasSearched(true);
        return;
      }
    } else if (filtersFlag === "true") {
      // Restore results from filters
      const cachedResults = sessionStorage.getItem("filtersResults");
      const cachedSelected = sessionStorage.getItem("filtersSelected");
      if (cachedResults) {
        setMeals(JSON.parse(cachedResults));
        if (cachedSelected) setSelectedFilters(JSON.parse(cachedSelected));
        setHasSearched(true);
        return;
      }
    } else if (mealId) {
      // Handle specific meal restoration
      const cachedMeal = sessionStorage.getItem(`meal:${mealId}`);
      if (cachedMeal) {
        const meal = JSON.parse(cachedMeal);
        setMeals([meal]);
        setHasSearched(true);
        return;
      }
    } else if (q) {
      setQuery(q);
      // attempt to hydrate from cache immediately
      const cacheKey = `meals:${q}:${type}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setMeals(JSON.parse(cached));
        setHasSearched(true);
        return;
      }
      handleSearch();
    } else {
      // No query in URL; try restoring last query from session
      const lastQuery = (sessionStorage.getItem("lastQuery") || "").trim();
      if (lastQuery) {
        setQuery(lastQuery);
        const cacheKey = `meals:${lastQuery}:ingredients`;
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          setMeals(JSON.parse(cached));
          setHasSearched(true);
          return;
        }
        // if no cache, trigger a search with the last query
        handleSearch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render the main UI
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page title */}
      <h1 className="text-3xl font-semibold">Discover Your Next Meal</h1>
      <div className="mt-2 flex items-center gap-2">
        {/* Info text and meal suggestions */}
        <p className="text-gray-800">
          Search by ingredients (e.g., "chicken, rice") or meal names (e.g., "Arrabiata")
        </p>
        <MealSuggestions onMealSelect={handleMealSelect} />
      </div>

      {/* Search form for meals */}
      <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: chicken, rice, Arrabiata, or click the info button for suggestions"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 shadow-sm transition-all duration-200 bg-[#f3f8f8]"
          />
        </div>
        {/* Search button */}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-60 transition-all duration-200 shadow-sm"
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {/* Random meal button */}
        <button
          type="button"
          onClick={handleRandomMeal}
          className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 transition-all duration-200 shadow-sm"
          disabled={loading}
        >
          🎲 Random
        </button>
      </form>

      {/* Advanced filters for meal search */}
      <AdvancedFilters 
        onFilterChange={handleFilterChange}
        selectedFilters={selectedFilters}
      />

      <div className="mt-6">
        {/* Error message and loader */}
        {error && <ErrorMessage message={error} onRetry={handleSearch} />}
        {loading && <Loader />}

        {/* No results found message */}
        {!loading && hasSearched && meals.length === 0 && !error && (
          <div className="text-center text-gray-600 py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-lg">No recipes found. Try different ingredients or filters.</p>
          </div>
        )}
        
        {/* Show SVG illustration when idle */}
        {!loading && meals.length === 0 && !error && !hasSearched && (
          <div className="py-2 flex flex-col items-center justify-center text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 max-w-3xl">
              Busy day? Find quick, tasty meals with what's in your kitchen.
            </h2>
            {/* Decorative center illustration while idle */}
            <img
              src={backgroundSvg}
              alt="Search illustration"
              className="mt-6 rounded-4xl w-full max-w-lg sm:max-w-xl md:max-w-2xl"
            />
          </div>
        )}

        {/* Show recipe cards for found meals */}
        {!loading && meals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


