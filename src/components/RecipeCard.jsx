import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  const { idMeal, strMeal, strMealThumb } = meal || {};
  const imageSrc = formatMealImage(strMealThumb);
  return (
    <div className="group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full h-full">
      <div className="relative p-2.5 h-56 sm:h-64 md:h-72 overflow-hidden rounded-xl bg-clip-border">
        {imageSrc ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={imageSrc}
            alt={strMeal}
            className="h-full w-full object-cover rounded-md transition-transform duration-300 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm rounded-md bg-gray-100">
            No Image
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-slate-800 text-xl font-semibold line-clamp-2">{strMeal}</p>
          <p className="text-cyan-600 text-xl font-semibold whitespace-nowrap">Meal</p>
        </div>
        <p className="text-slate-600 leading-normal font-light line-clamp-2">
          Discover full instructions and ingredients inside.
        </p>
        <Link
          to={`/recipe/${idMeal}`}
          className="rounded-md w-full mt-auto bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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


