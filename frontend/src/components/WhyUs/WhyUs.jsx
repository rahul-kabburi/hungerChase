const WhyUs = () => {
  const features = [
    {
      title: "Fast Delivery",
      description: "Get your food delivered hot and fresh in under 30 minutes.",
      icon: "🚀",
    },
    {
      title: "Wide Variety",
      description: "Choose from a wide range of cuisines and dishes.",
      icon: "🍱",
    },
    {
      title: "Live Order Tracking",
      description: "Track your order in real-time from kitchen to doorstep.",
      icon: "📍",
    },
    {
      title: "Secure Payments",
      description: "Multiple payment options with 100% security.",
      icon: "🔐",
    },
  ];

  return (
    <section id="why-us" className="py-12 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-6">Why Choose HungerChase?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow transition-all duration-300 transform hover:scale-120 hover:shadow-2xl">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
