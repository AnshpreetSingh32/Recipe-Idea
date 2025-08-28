/**
 * MealSuggestions Component
 * 
 * A dropdown component that provides meal suggestions based on the first letter.
 * Features a toggle button to show/hide suggestions and handles meal selection.
 * 
 * @param {Object} props
 * @param {Function} props.onMealSelect - Callback function triggered when a meal is selected
 */

import { useState, useEffect } from "react";
import { searchMealsByFirstLetter } from "../utils/api";

export default function MealSuggestions({ onMealSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFirstLetterSearch = async (letter) => {
    if (!letter || letter.length !== 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const results = await searchMealsByFirstLetter(letter);
      setSuggestions(results.slice(0, 10)); // Limit to 10 suggestions
      setShowSuggestions(true);
    } catch (error) {
      console.error("Failed to fetch meal suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (meal) => {
    onMealSelect(meal);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      {/* Info Button - standalone positioned after paragraph */}
      <button
        type="button"
        onClick={() => setShowSuggestions(!showSuggestions)}
        className="text-gray-600 hover:text-orange-500 transition-colors duration-200 bg-[#f3f8f8] rounded-full p-1 shadow-sm border border-gray-200 flex-shrink-0"
        title="Browse meals by first letter"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto w-[90vw] max-w-sm sm:min-w-80 sm:w-auto">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-medium mb-3">
              Browse meals by first letter
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleFirstLetterSearch(letter)}
                  className="px-2 py-1 text-xs bg-[#f3f8f8] hover:bg-orange-100 hover:text-orange-700 rounded-lg transition-all duration-200 font-medium border border-gray-200"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto mb-2"></div>
              Loading suggestions...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs text-orange-600 border-b border-gray-100">
                {suggestions.length} meals found
              </div>
              {suggestions.map((meal) => (
                <button
                  key={meal.idMeal}
                  onClick={() => handleSuggestionClick(meal)}
                  className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors duration-200 flex items-center border-b border-gray-50 last:border-b-0"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-10 h-10 rounded-lg object-cover mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">
                      {meal.strMeal}
                    </div>
                    <div className="text-xs text-gray-500">
                      Click to view recipe
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-500">
              <div className="text-2xl mb-2">🍽️</div>
              <p className="text-sm">Click a letter above to see meal suggestions</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
