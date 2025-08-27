import { useState } from "react";
import { Link } from "react-router-dom";

export default function Help() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "How do I search for recipes?",
      answer: "Enter any ingredients in the search bar (e.g., 'chicken, tomato, onion'). We'll suggest recipes using them. You can search with as few as one ingredient or as many as you have on hand."
    },
    {
      question: "Do I need an account?",
      answer: "No — you can start searching right away. An account lets you save favorites and get personalized recommendations. We're working on adding this feature soon!"
    },
    {
      question: "What if I don't have all the ingredients?",
      answer: "We'll show flexible recipe ideas with suggested substitutions. Many recipes can be adapted with what you have. Don't be afraid to experiment with similar ingredients!"
    },
    {
      question: "Is it free?",
      answer: "Yes! You can use the recipe search for free. We believe everyone should have access to great cooking ideas without any barriers."
    },
    {
      question: "Can I save my favorite recipes?",
      answer: "Currently, you can bookmark recipes in your browser. We're developing a save feature that will let you create your own recipe collection."
    },
    {
      question: "Where do the recipes come from?",
      answer: "Our recipes come from a curated database of popular and trusted sources. We focus on recipes that are practical, delicious, and achievable for home cooks."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Need help? We've got answers
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Quick answers to common questions. Can't find what you're looking for? 
          We're here to help!
        </p>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-xl shadow-sm">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-orange-50 transition-colors duration-200 rounded-t-xl bg-[#f3f8f8] rounded-xl"
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <span className="text-orange-400 text-xl">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openFaq === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className={`overflow-hidden px-6 ${openFaq === index ? 'pb-4' : 'pb-0'}`}> 
                  <p className="text-gray-700 leading-relaxed pt-1">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-br from-orange-100 to-[#c4d9dd] p-8 rounded-2xl mb-8 border-orange-100 border-2">
        <div className="text-center">
          <div className="text-4xl mb-4">🤔💭</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-800 mb-6">
            We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.
          </p>
          <div className="space-y-4">
            <a
              href="mailto:anshpreetsingh3232@gmail.com"
              className="inline-flex items-center px-4 sm:px-6 py-3 bg-orange-400 text-white font-semibold rounded-lg hover:bg-orange-500 transition-all hover:scale-105 duration-200 text-lg sm:text-base break-words shadow-sm"
            >
              <span className="hidden sm:inline">🖂 Email us at </span>
              <span className="sm:hidden">🖂 Contact us</span>
              <span className="hidden sm:inline">support@recipeideas.com</span>
            </a>
            <div className="text-sm text-gray-600">
              We typically respond within 24 hours
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start CTA */}
      <div className="text-center bg-gradient-to-tl from-orange-100 to-[#c4d9dd] p-8 rounded-2xl mb-8">
        <h3 className="text-2xl font-semibold mb-4">Ready to start cooking?</h3>
        <p className=" mb-6">
          Jump back to the recipe search and discover your next meal
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-[#e0ebed] transition-all shadow-lg
          hover:scale-105 duration-200"
        >
          Start Searching Recipes →
        </Link>
      </div>

      
    </div>
  );
}


