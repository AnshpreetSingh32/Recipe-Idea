// About page for the app
import { Link } from "react-router-dom";

// Main About page component
export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top hero section with app intro */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Cooking made simple — right from your pantry
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          This platform helps busy people discover recipe ideas with the ingredients they already have at home.
          Instead of scrolling endlessly, just type what's in your fridge and we'll do the rest.
        </p>
      </div>

      {/* Mission and How it Works cards */}
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        {/* Mission card */}
        <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-8 rounded-2xl border border-orange-100 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="text-3xl">🎯</div>
            <h2 className="text-2xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-800 leading-relaxed max-w-xl mx-auto">
            We want to save you time, cut food waste, and make cooking enjoyable — even on busy weekdays.
            No more staring at empty shelves wondering what to cook!
          </p>
        </div>

        {/* How it Works card */}
        <div className="bg-gradient-to-br from-[#e0ebed] to-[#c4d9dd] p-8 rounded-2xl border border-blue-100 flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center mb-2 w-full">
            <div className="text-4xl">⚡</div>
            <h2 className="text-2xl font-semibold">How it Works</h2>
          </div>
          <div className="mt-3 space-y-3 text-gray-800 w-full">
            {/* Step 1: Enter ingredients */}
            <div className="flex items-center justify-center">
              <span className="bg-[#f3f8f8] text-sm font-medium px-2 py-1 rounded-full mr-3">1</span>
              <span>Enter your ingredients</span>
            </div>
            {/* Step 2: Get ideas */}
            <div className="flex items-center justify-center">
              <span className="bg-[#f3f8f8] text-sm font-medium px-2 py-1 rounded-full mr-3">2</span>
              <span>Get recipe ideas</span>
            </div>
            {/* Step 3: Start cooking */}
            <div className="flex items-center justify-center">
              <span className="bg-[#f3f8f8] text-sm font-medium px-2 py-1 rounded-full mr-3">3</span>
              <span>Start cooking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are section */}
      <div className="bg-gradient-to-br from-orange-100 to-[#c4d9dd] p-8 rounded-2xl mb-12 border border-purple-100">
        <div className="text-center">
          <div className="text-4xl mb-4">👨‍🍳</div>
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-800 leading-relaxed max-w-2xl mx-auto">
            A small team of food lovers and technologists who believe good meals shouldn't be complicated.
            We're passionate about making cooking accessible, enjoyable, and waste-free for everyone.
          </p>
        </div>
      </div>

      {/* Call to action section */}
      <div className="text-center bg-gradient-to-tl from-orange-100 to-[#c4d9dd] p-8 rounded-2xl">
        <h3 className="text-2xl font-semibold mb-4">Ready to discover your next meal?</h3>
        <p className=" mb-6">
          Start searching with whatever ingredients you have on hand
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-[#e0ebed] transition-all duration-200 shadow-lg hover:scale-105"
        >
          Start Searching Recipes →
        </Link>
      </div>
    </div>
  );
}


