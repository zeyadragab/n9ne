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
      <div className="min-h-screen bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Service Not Found
          </h1>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-lg hover:scale-105 transition-transform shadow-md"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main">
      {/* Background Effects */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="fixed bottom-20 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Back Button */}
      <div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/services")}
          className="flex items-center gap-2 text-accent-purple hover:text-accent-blue transition-colors mb-8 group"
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
            <div className="relative rounded-3xl overflow-hidden border border-bg-secondary/60 shadow-lg group">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[500px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              />
              {/* Subtle dark scrim */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

              {/* Floating Icon */}
              <div className="absolute top-6 right-6 transition-transform duration-500 group-hover:-translate-y-1">
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-md`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Service Number Badge */}
              <div className="absolute top-6 left-6 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 backdrop-blur-md border border-gray-100 shadow-sm">
                  <span className="text-text-main font-bold text-2xl">
                    {String(service.id).padStart(2, "0")}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border border-accent-purple/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
                Premium Service
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main mb-6">
              {service.title}
            </h1>

            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              {service.fullDescription}
            </p>

            <div className="bg-bg-main backdrop-blur-xl rounded-2xl border border-bg-secondary shadow-sm p-6 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-main">Pricing</h3>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                {service.pricing}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)]"
              >
                <MessageCircle className="w-4 h-4" />
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-text-main transition-all duration-300 bg-bg-secondary/50 backdrop-blur-md rounded-2xl border border-accent-purple/30 hover:bg-bg-main hover:border-accent-purple/60 hover:shadow-[0_8px_30px_rgb(124,58,237,0.1)]"
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
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8">
            What's{" "}
            <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
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
                className="flex items-start gap-3 p-4 bg-bg-main backdrop-blur-xl rounded-xl border border-bg-secondary hover:border-accent-purple/40 transition-all shadow-sm group"
              >
                <div className="p-1 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue mt-1 shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-text-muted group-hover:text-text-main transition-colors">
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
          <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-8">
            Technologies &{" "}
            <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
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
                className="px-6 py-3 bg-bg-secondary backdrop-blur-xl rounded-full border border-bg-main hover:border-accent-purple/50 transition-all hover:scale-105 shadow-sm"
              >
                <span className="text-text-main font-semibold">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-bg-secondary backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-bg-main p-8 sm:p-12 text-center mb-16 shadow-lg shadow-accent-purple/5"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-muted mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's discuss how {service.title.toLowerCase()} can help elevate
            your business to the next level
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)]"
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
