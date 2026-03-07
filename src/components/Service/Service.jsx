import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { servicesData } from "../../data/servicesData";

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-pink/10 rounded-full blur-3xl animate-pulse"
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border border-accent-purple/20 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
              What We Offer
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-main">
            Our{" "}
            <span className="bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
              Premium Services
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
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
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/services")}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r  from-accent-purple via-accent-pink to-accent-blue rounded border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)] max-w-fit mx-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
      onClick={handleClick}
      className="group relative flex flex-col h-full overflow-hidden bg-white rounded-3xl border border-bg-secondary/60 hover:border-gray-100 transition-colors duration-500 cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
    >
      {/* Premium Image Container */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <div
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
        {/* Very subtle dark scrim to slightly bump badge contrast without huge white fades */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

        {/* Floating Number Badge */}
        <div className="absolute top-5 left-5 z-10 transition-transform duration-500 group-hover:-translate-y-1">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-gray-100 text-xs font-bold text-text-main">
            {String(service.id).padStart(2, "0")}
          </div>
        </div>

        {/* Icon Badge */}
        <div className="absolute bottom-5 right-5 z-10 transition-transform duration-500 group-hover:-translate-y-1">
          <div
            className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} shadow-md text-white`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Modern, crisp content area layout */}
      <div className="flex flex-col flex-1 p-8 bg-white relative z-20 rounded-b-3xl">
        <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-accent-purple transition-colors duration-300 line-clamp-1">
          {service.title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Minimalist Learn More */}
        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-text-main group-hover:text-accent-purple transition-colors duration-300">
          <span>Explore Service</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Decorative colored line on bottom border on hover */}
      <div
        className={`absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out bg-gradient-to-r ${service.color} z-30`}
      ></div>
    </motion.div>
  );
};

export default Services;
