/**
 * RecipeCard Component
 * 
 * Displays a single recipe in a card format with image, title, and a link to view details.
 * Features hover effects, image lazy loading, and responsive design.
 * 
 * @param {Object} props
 * @param {Object} props.meal - The meal object containing recipe data
 * @param {string} props.meal.idMeal - Unique identifier for the meal
 * @param {string} props.meal.strMeal - Name of the meal
 * @param {string} props.meal.strMealThumb - URL of the meal's image
 */

import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  const { idMeal, strMeal, strMealThumb } = meal || {};
  const imageSrc = formatMealImage(strMealThumb);
  return (
    <div className="group relative flex flex-col my-6 bg-whitw shadow-sm border border-gray-100 rounded-xl w-full h-full hover:shadow-xl transition-all duration-300 bg-[#f3f8f8]">
      <div className="relative p-2.5 pt-2 h-56 sm:h-64 md:h-72 overflow-hidden rounded-t-xl bg-clip-border">
        {imageSrc ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={imageSrc}
            alt={strMeal}
            className="h-full w-full object-cover rounded-lg transition-transform duration-300 ease-out group-hover:scale-107"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm rounded-lg bg-gray-50">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3 flex items-center justify-between">
          <p className=" text-xl font-semibold line-clamp-2">{strMeal}</p>
          
        </div>
        <p className="text-gray-800 leading-normal font-light line-clamp-2">
          Discover full instructions and ingredients inside — click on view details.
        </p>
        <Link
          to={`/recipe/${idMeal}`}
          className="rounded-lg w-full mt-auto bg-orange-400 py-3 px-4 border border-transparent text-center text-md text-white transition-all shadow-sm hover:shadow-md focus:bg-orange-500 focus:shadow-none active:bg-orange-500 hover:bg-orange-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

function formatMealImage(url) {
  if (!url || typeof url !== "string") return url;
  if (/\.(jpg|jpeg|png)$/i.test(url)) {
    return `${url}/medium`;
  }
  return url;
}


