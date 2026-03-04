import React from "react";
import Footer from "../../components/Footer.jsx";

function AgriInfo() {
  return (
    <div className="min-h-screen pt-14 bg-gradient-to-b from-green-50 to-green-100">
      {/* Title */}
      <h1 className="text-center font-semibold text-5xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mt-10 ">
        Learn About Agriculture
      </h1>
      <p className="text-center text-lg mt-4 text-gray-600">
        Stay updated with the latest news, trends, and essential practices in agriculture
      </p>

      {/* Hero Image */}
      <div className="flex justify-center mt-10">
        <img className="rounded-2xl shadow-lg w-[90%] md:w-[70%] h-[400px] object-cover"
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80"
          alt="Agriculture field"

        />
      </div>

      {/* Agricultural News Section */}
      <section className="mt-16 px-6 md:px-20">
        <h2 className="text-center font-semibold text-4xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
          🌾 Latest Agricultural News
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* News 1 */}
          <div className="shadow-xl rounded-2xl border border-green-200 bg-white">
            <div className="p-5">
              <img
                src="https://images.pexels.com/photos/348689/pexels-photo-348689.jpeg"
                alt="Organic farming"
                className="rounded-lg mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold text-green-800">
                Rising Demand for Organic Farming
              </h3>
              <p className="text-gray-600 mt-2">
                Organic farming continues to grow as people prefer chemical-free
                and healthy food products. Farmers are shifting towards
                sustainable practices.
              </p>
            </div>
          </div>

          {/* News 2 */}
          <div className="shadow-xl rounded-2xl border border-green-200 bg-white">
            <div className="p-5">
              <img
                src="https://media.istockphoto.com/id/898449496/photo/agriculture-drone-fly-to-sprayed-fertilizer-on-the-green-tea-fie.jpg?s=612x612&w=0&k=20&c=XB9L5U65qaNqs8k7KPKOiL6N_mj1d1JpKPJFcmMsrz0="
                alt="Smart irrigation"
                className="rounded-lg mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold text-green-800">
                Smart Irrigation Techniques
              </h3>
              <p className="text-gray-600 mt-2">
                Smart irrigation systems are helping farmers save water and
                increase crop yields by using sensors and data-driven methods.
              </p>
            </div>
          </div>

          {/* News 3 */}
          <div className="shadow-xl rounded-2xl border border-green-200 bg-white">
            <div className="p-5">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"
                alt="Climate resilient crops"
                className="rounded-lg mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold text-green-800">
                Climate-Resilient Crops
              </h3>
              <p className="text-gray-600 mt-2">
                Scientists are developing crop varieties that can withstand
                drought, floods, and climate change effects, ensuring food
                security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Content Section */}
      <section className="mt-20 px-6 md:px-32">
        <h2 className="text-center font-semibold text-4xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
          🌱 Essential Agriculture Practices
        </h2>
        <ul className="list-disc text-lg text-gray-700 space-y-3 pl-6">
          <li>🌾 Crop Rotation – improves soil fertility and reduces pests.</li>
          <li>🌱 Organic Fertilizers – promote healthy and sustainable farming.</li>
          <li>💧 Water Conservation – drip irrigation & rainwater harvesting.</li>
          <li>🤖 Modern Technology – drones, sensors & AI in farming.</li>
          <li>🌳 Agroforestry – planting trees with crops improves soil health.</li>
        </ul>
      </section>

      {/* Benefits Section */}
      <section className="mt-20 px-6 md:px-20">
        <h2 className="text-center font-semibold text-4xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
          🌍 Benefits of Modern Agriculture
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Increased Yield</h3>
            <p className="text-gray-600">Modern practices help farmers produce more food with fewer resources.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Sustainability</h3>
            <p className="text-gray-600">Eco-friendly methods reduce pollution and protect natural resources.</p>
          </div>
          <div className="p-5 bg-white rounded-xl shadow-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Better Quality</h3>
            <p className="text-gray-600">Consumers get healthier, chemical-free, and nutritious food.</p>
          </div>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="mt-20 px-6 md:px-20">
        <h2 className="text-center font-semibold text-4xl  font-mono tracking-widest 
                  bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
          📊 Quick Facts About Agriculture
        </h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="p-5 bg-green-100 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-green-800">70%</h3>
            <p className="text-gray-600">Global freshwater is used in farming</p>
          </div>
          <div className="p-5 bg-green-100 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-green-800">40%</h3>
            <p className="text-gray-600">People worldwide rely on agriculture for jobs</p>
          </div>
          <div className="p-5 bg-green-100 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-green-800">2050</h3>
            <p className="text-gray-600">Food demand expected to double by 2050</p>
          </div>
          <div className="p-5 bg-green-100 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-green-800">90%</h3>
            <p className="text-gray-600">Of farms are family-owned globally</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center mt-16 pb-10 text-gray-600">
        <p>© 2024 SmartAgroHub – Empowering Farmers with Knowledge 🌍</p>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default AgriInfo;
