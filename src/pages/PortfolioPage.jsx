import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Share2,
  Video,
  Camera,
  Sparkles,
  ExternalLink,
  Play,
  Clock,
  Eye,
} from "lucide-react";
import { portfolioData, categories } from "../data/portfolioData";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === "all") {
      const allItems = [
        ...portfolioData.websites.map((item) => ({ ...item, type: "website" })),
      ];
      setFilteredItems(allItems);
    } else {
      const categoryMap = {
        websites: portfolioData.websites.map((item) => ({
          ...item,
          type: "website",
        })),
      };
      setFilteredItems(categoryMap[activeCategory] || []);
    }
  }, [activeCategory]);

  const getCategoryIcon = (type) => {
    switch (type) {
      case "website":
        return Globe;
      default:
        return Globe;
    }
  };

  const getCategoryColor = (type) => {
    switch (type) {
      case "website":
        return "from-accent-purple to-accent-blue";
      default:
        return "from-accent-purple to-accent-blue";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main">
      {/* Background Effects */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
              Creative Work
            </span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto">
            Explore our portfolio of stunning websites and digital experiences
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue text-white shadow-lg shadow-accent-purple/30 scale-105"
                  : "bg-bg-secondary/50 text-text-main border border-accent-purple/20 hover:bg-bg-main hover:border-accent-purple/40 hover:shadow-sm"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Sections View (when specific category is selected) */}
        {activeCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <PortfolioCard
                    key={`${item.type}-${item.id}`}
                    item={item}
                    index={index}
                    getCategoryIcon={getCategoryIcon}
                    getCategoryColor={getCategoryColor}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* All Work View (sections) */}
        {activeCategory === "all" && (
          <>
            {/* Websites Section */}
            <PortfolioSection
              title="Websites"
              subtitle="Modern, responsive websites that convert"
              icon={Globe}
              items={portfolioData.websites.map((item) => ({
                ...item,
                type: "website",
              }))}
              color="from-accent-purple to-accent-blue"
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />
          </>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-bg-secondary backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-bg-main p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-main mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-muted mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life with our creative expertise
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)] max-w-fit mx-auto"
          >
            Start Your Project
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

// Portfolio Section Component
const PortfolioSection = ({
  title,
  subtitle,
  icon: Icon,
  items,
  color,
  getCategoryIcon,
  getCategoryColor,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-text-main">{title}</h2>
          <p className="text-text-muted">{subtitle}</p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.slice(0, 6).map((item, index) => (
          <PortfolioCard
            key={`${item.type}-${item.id}`}
            item={item}
            index={index}
            getCategoryIcon={getCategoryIcon}
            getCategoryColor={getCategoryColor}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Portfolio Card Component
const PortfolioCard = ({ item, index, getCategoryIcon, getCategoryColor }) => {
  const Icon = getCategoryIcon(item.type);
  const colorClass = getCategoryColor(item.type);
  const hasLink = item.link && item.link !== "#";
  const MotionEl = hasLink ? motion.a : motion.div;
  const linkProps = hasLink
    ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <MotionEl
      {...linkProps}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative flex flex-col h-full overflow-hidden bg-white rounded-3xl border border-bg-secondary/60 hover:border-gray-100 transition-colors duration-500 cursor-pointer shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden rounded-t-3xl">
        <img
          src={item.image || item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
        {/* Subtle dark scrim */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>

        {/* Category Badge */}
        <div className="absolute top-5 left-5 z-10 transition-transform duration-500 group-hover:-translate-y-1">
          <div
            className={`p-2.5 rounded-xl bg-gradient-to-br ${colorClass} shadow-md text-white`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Hover Overlay for Websites */}
        {item.type === "website" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-main/40 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl border border-accent-purple/20 shadow-xl group-hover:scale-110 transition-transform duration-300 delay-100">
              <ExternalLink className="w-4 h-4 text-accent-purple" />
              <span className="text-text-main font-bold text-sm">View Site</span>
            </div>
          </div>
        )}
      </div>

      {/* Modern, crisp content area layout */}
      <div className="flex flex-col flex-1 p-8 bg-white relative z-20 rounded-b-3xl">
        <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-accent-purple transition-colors duration-300 line-clamp-1">
          {item.title}
        </h3>

        {item.client && (
          <p className="text-accent-purple text-xs font-bold uppercase tracking-wider mb-3">
            {item.client}
          </p>
        )}

        <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
          {item.description}
        </p>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-gray-100">
          {/* Regular Tags */}
          {item.tags && item.tags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-semibold text-text-muted bg-bg-secondary rounded-lg border border-gray-100"
            >
              {tag}
            </span>
          ))}
          {item.tags && item.tags.length > 2 && (
            <span className="px-2 py-1 text-xs font-semibold text-text-muted">
              +{item.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      {/* Decorative colored line on bottom border on hover */}
      <div
        className={`absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out bg-gradient-to-r ${colorClass} z-30`}
      ></div>
    </MotionEl>
  );
};

export default PortfolioPage;
