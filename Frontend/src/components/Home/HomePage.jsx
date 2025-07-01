import React from "react";
import { Link } from "react-router-dom";
import { Shield, Clock, Star, ArrowRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { DataStore } from "../../data/mockData";
import { motion } from "framer-motion";

export function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const services = DataStore.getServices().slice(0, 3);

  const features = [
    {
      icon: Shield,
      title: "Trusted Professionals",
      description:
        "All our service providers are verified and experienced professionals",
    },
    {
      icon: Clock,
      title: "Quick Booking",
      description:
        "Book your car service in just a few clicks and get confirmed instantly",
    },
    {
      icon: Star,
      title: "Quality Service",
      description:
        "We ensure the highest quality of service with customer satisfaction guarantee",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video/porsche-speed.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 text-center text-white px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            GarageX
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Book trusted car maintenance and repair services from verified
            professionals.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {isAuthenticated ? (
              <>
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-white to-blue-100 text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition duration-300 flex items-center space-x-2"
                >
                  <span>Browse Services</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to={`/dashboard/${user?.role}`}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-white to-blue-100 text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition duration-300 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GarageX?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make car maintenance simple, reliable, and convenient for
              everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-blue-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers who trust GarageX for their
            car maintenance needs
          </p>

          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-gradient-to-r from-white to-blue-100 text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/50 transition duration-300 inline-flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </motion.section>
    </div>
  );
}
