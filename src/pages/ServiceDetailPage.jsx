import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "../data/servicesData";
import {
  ArrowLeft,
  Check,
  Mail,
  Phone,
  Sparkles,
  Code2,
  MessageCircle,
} from "lucide-react";
import { useEffect } from "react";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Service Not Found
          </h1>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Background Effects */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="fixed bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Back Button */}
      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Services</span>
        </motion.button>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl shadow-purple-500/20">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

              {/* Floating Icon */}
              <div className="absolute top-6 right-6">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-xl`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Service Number Badge */}
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border-2 border-purple-400/50">
                  <span className="text-white font-bold text-2xl">
                    {service.id}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/40 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Premium Service
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/40 p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Pricing</h3>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {service.pricing}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg font-semibold text-sm sm:text-base text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm border border-purple-500/40 rounded-lg font-semibold text-sm sm:text-base text-white hover:bg-white/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            What's{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Included
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all group"
              >
                <div className="p-1 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Technologies &{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Tools
            </span>
          </h2>
          <div className="flex flex-wrap gap-3">
            {service.technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="px-6 py-3 bg-gradient-to-br from-purple-900/60 via-indigo-900/60 to-blue-900/60 backdrop-blur-xl rounded-full border border-purple-500/40 hover:border-purple-400/70 transition-all hover:scale-105"
              >
                <span className="text-white font-semibold">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-purple-900/60 via-pink-900/60 to-blue-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-purple-500/40 p-8 sm:p-12 text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's discuss how {service.title.toLowerCase()} can help elevate
            your business to the next level
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg font-semibold text-sm sm:text-base text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            >
              <Mail className="w-4 h-4" />
              Contact Us Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
