import { useState, useEffect } from "react";
import { getCategories, getAreas, getIngredients } from "../utils/api";

export default function AdvancedFilters({ onFilterChange, selectedFilters }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);

  const getRandomSubset = (array, count = 15) => {
    const safeCount = Math.max(0, Math.min(count, array?.length || 0));
    const shuffled = [...(array || [])].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, safeCount);
  };

  useEffect(() => {
    if (isExpanded) {
      loadFilterData();
    }
  }, [isExpanded]);

  const loadFilterData = async () => {
    setLoading(true);
    try {
      const [categoriesData, areasData, ingredientsData] = await Promise.all([
        getCategories(),
        getAreas(),
        getIngredients()
      ]);
      setCategories(categoriesData);
      setAreas(areasData);
      // Store all ingredients and show a random 15 initially
      setAllIngredients(ingredientsData);
      setIngredients(getRandomSubset(ingredientsData, 15));
    } catch (error) {
      console.error("Failed to load filter data:", error);
    } finally {
      setLoading(false);
    }
  };

  const randomizeIngredients = () => {
    setIngredients(getRandomSubset(allIngredients, 15));
  };

  const handleFilterToggle = (filterType, value) => {
    const currentFilters = selectedFilters[filterType] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFilterChange({
      ...selectedFilters,
      [filterType]: newFilters
    });
  };

  const resetAllFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(selectedFilters).some(filters => filters && filters.length > 0);
  const activeFiltersCount = Object.values(selectedFilters).reduce((sum, filters) => sum + (filters?.length || 0), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 mt-4">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-orange-100 transition-colors duration-200 rounded-t-xl bg-orange-50"
      >
        <div className="flex items-center">
          <span className="text-orange-600 mr-3">🔍</span>
          <span className="font-medium ">Advanced Filters</span>
          {hasActiveFilters && (
            <span className="ml-2 text-white bg-orange-500 text-xs px-2 py-1 rounded-full border-orange-200">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        <span className="text-orange-400 text-sm">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          {loading ? (
            <div className="py-8 text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3"></div>
              Loading filters...
            </div>
          ) : (
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium text-gray-900 my-3">Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.strCategory}
                      onClick={() => handleFilterToggle('categories', category.strCategory)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        selectedFilters.categories?.includes(category.strCategory)
                          ? 'bg-orange-100 text-orange-700 border border-orange-200 font-medium'
                          : 'bg-[#f3f8f8] text-gray-800 hover:bg-[#e0ebed] border border-gray-100'
                      }`}
                    >
                      {category.strCategory}
                    </button>
                  ))}
                </div>
              </div>

              {/* Areas */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Cuisine Areas</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {(showAllAreas ? areas : areas.slice(0, 8)).map((area) => (
                    <button
                      key={area.strArea}
                      onClick={() => handleFilterToggle('areas', area.strArea)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        selectedFilters.areas?.includes(area.strArea)
                          ? 'bg-orange-100 text-orange-700 border border-orange-200 font-medium'
                          : 'bg-[#f3f8f8] text-gray-800 hover:bg-[#e0ebed] border border-gray-100'
                      }`}
                    >
                      {area.strArea}
                    </button>
                  ))}
                </div>
                {areas.length > 8 && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => setShowAllAreas(!showAllAreas)}
                      className="text-sm text-gray-600 hover:text-orange-400 underline transition-colors duration-200"
                    >
                      {showAllAreas ? 'Show less' : `Show ${areas.length - 8} more`}
                    </button>
                  </div>
                )}
              </div>

              {/* Popular Ingredients */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-medium text-gray-900">Popular Ingredients</h3>
                  <button
                    type="button"
                    onClick={randomizeIngredients}
                    className="inline-flex items-center justify-center p-1 text-sm rounded bg-[#c4d9dd] text-gray-800 hover:bg-orange-400 border border-gray-200 transition-all duration-200"
                    title="Randomize ingredients"
                    aria-label="Randomize ingredients"
                  >
                    <span className="leading-none">🗘</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {ingredients.slice(0, 15).map((ingredient) => (
                    <button
                      key={ingredient.idIngredient || ingredient.strIngredient}
                      onClick={() => handleFilterToggle('ingredients', ingredient.strIngredient)}
                      className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        selectedFilters.ingredients?.includes(ingredient.strIngredient)
                          ? 'bg-orange-100 text-orange-700 border border-orange-200 font-medium'
                          : 'bg-[#f3f8f8] text-gray-800 hover:bg-[#e0ebed] border border-gray-100'
                      }`}
                    >
                      {ingredient.strIngredient}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-gray-300">
                  <button
                    onClick={resetAllFilters}
                    className="flex items-center text-gray-800 hover:text-orange-600 transition-colors duration-200"
                  >
                    <span className="mr-2">✕</span>
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
