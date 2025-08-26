import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cooking made simple — right from your pantry
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          This platform helps busy people discover recipe ideas with the ingredients they already have at home. 
          Instead of scrolling endlessly, just type what's in your fridge and we'll do the rest.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        {/* Our Mission */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
          <div className="text-3xl mb-4">🎯</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We want to save you time, cut food waste, and make cooking enjoyable — even on busy weekdays. 
            No more staring at empty shelves wondering what to cook!
          </p>
        </div>

        {/* How it Works */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
          <div className="text-3xl mb-4">⚡</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How it Works</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full mr-3">1</span>
              <span>Enter your ingredients</span>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full mr-3">2</span>
              <span>Get recipe ideas</span>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full mr-3">3</span>
              <span>Start cooking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl mb-12">
        <div className="text-center">
          <div className="text-3xl mb-4">👨‍🍳</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            A small team of food lovers and technologists who believe good meals shouldn't be complicated. 
            We're passionate about making cooking accessible, enjoyable, and waste-free for everyone.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl">
        <h3 className="text-2xl font-semibold mb-4">Ready to discover your next meal?</h3>
        <p className="text-blue-100 mb-6">
          Start searching with whatever ingredients you have on hand
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
        >
          Start Searching Recipes →
        </Link>
      </div>

      {/* Back to Recipes CTA */}
      <div className="text-center mt-8">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
        >
          ← Back to Recipes
        </Link>
      </div>
    </div>
  );
}


