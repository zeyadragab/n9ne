import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { servicesData } from "../../data/servicesData";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/40 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              What We Offer
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Premium Services
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive digital solutions designed to elevate your brand and
            dominate your market with cutting-edge technology
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              navigate={navigate}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/services")}
            className="group relative px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg font-semibold text-sm sm:text-base overflow-hidden shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2 text-white">
              View All Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, navigate }) => {
  const Icon = service.icon;

  const handleClick = () => {
    navigate(`/services/${service.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={handleClick}
      className="group relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl border-2 border-purple-500/40 hover:border-purple-400/70 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-purple-500/40"
    >
      {/* Background Image with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <div
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

        {/* Icon Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Number Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border-2 border-purple-400/50 group-hover:scale-110 transition-all duration-300">
            <span className="text-white font-bold text-lg">{service.id}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
          {service.shortDescription}
        </p>

        {/* Learn More Link */}
        <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 font-semibold transition-all duration-300">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>

      {/* Hover Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
      ></div>
    </motion.div>
  );
};

export default Services;
