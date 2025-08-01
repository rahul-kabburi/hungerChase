const HowItWorks = () => {
  const steps = [
    {
      title: "Browse Menu",
      description: "Explore restaurants and dishes available in your area.",
      icon: "🔍",
    },
    {
      title: "Place Order",
      description: "Select your food and place the order in just a few taps.",
      icon: "🛒",
    },
    {
      title: "Track Delivery",
      description: "Watch your food move from the kitchen to your doorstep.",
      icon: "📦",
    },
    {
      title: "Enjoy Meal",
      description: "Receive your food and enjoy a delightful meal.",
      icon: "🍽️",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-6">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow transition-all duration-300 transform hover:scale-120 hover:shadow-2xl">
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
