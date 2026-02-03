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
        ...portfolioData.socialMedia.map((item) => ({
          ...item,
          type: "social",
        })),
        ...portfolioData.videos.map((item) => ({ ...item, type: "video" })),
        ...portfolioData.productImages.map((item) => ({
          ...item,
          type: "product",
        })),
      ];
      setFilteredItems(allItems);
    } else {
      const categoryMap = {
        websites: portfolioData.websites.map((item) => ({
          ...item,
          type: "website",
        })),
        socialMedia: portfolioData.socialMedia.map((item) => ({
          ...item,
          type: "social",
        })),
        videos: portfolioData.videos.map((item) => ({
          ...item,
          type: "video",
        })),
        productImages: portfolioData.productImages.map((item) => ({
          ...item,
          type: "product",
        })),
      };
      setFilteredItems(categoryMap[activeCategory] || []);
    }
  }, [activeCategory]);

  const getCategoryIcon = (type) => {
    switch (type) {
      case "website":
        return Globe;
      case "social":
        return Share2;
      case "video":
        return Video;
      case "product":
        return Camera;
      default:
        return Globe;
    }
  };

  const getCategoryColor = (type) => {
    switch (type) {
      case "website":
        return "from-purple-600 to-blue-600";
      case "social":
        return "from-pink-600 to-purple-600";
      case "video":
        return "from-blue-600 to-cyan-600";
      case "product":
        return "from-orange-600 to-pink-600";
      default:
        return "from-purple-600 to-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Background Effects */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="fixed bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/40 backdrop-blur-sm mb-6"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Creative Work
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our portfolio of stunning websites, engaging social media
            campaigns, professional videos, and beautiful product photography
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
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-300 border border-purple-500/30 hover:bg-white/10 hover:border-purple-400/50"
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
              color="from-purple-600 to-blue-600"
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />

            {/* Social Media Section */}
            <PortfolioSection
              title="Social Media"
              subtitle="Engaging campaigns that grow your audience"
              icon={Share2}
              items={portfolioData.socialMedia.map((item) => ({
                ...item,
                type: "social",
              }))}
              color="from-pink-600 to-purple-600"
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />

            {/* Videos Section */}
            <PortfolioSection
              title="Videos"
              subtitle="Professional video content that captivates"
              icon={Video}
              items={portfolioData.videos.map((item) => ({
                ...item,
                type: "video",
              }))}
              color="from-blue-600 to-cyan-600"
              getCategoryIcon={getCategoryIcon}
              getCategoryColor={getCategoryColor}
            />

            {/* Product Images Section */}
            <PortfolioSection
              title="Product Images"
              subtitle="Stunning photography that sells"
              icon={Camera}
              items={portfolioData.productImages.map((item) => ({
                ...item,
                type: "product",
              }))}
              color="from-orange-600 to-pink-600"
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
          className="mt-20 bg-gradient-to-br from-purple-900/60 via-pink-900/60 to-blue-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border-2 border-purple-500/40 p-8 sm:p-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Let's bring your vision to life with our creative expertise
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
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
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          <p className="text-gray-400">{subtitle}</p>
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={item.image || item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div
            className={`p-2 rounded-lg bg-gradient-to-br ${colorClass} shadow-lg`}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Video Duration Badge */}
        {item.type === "video" && item.duration && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
            <Clock className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium">
              {item.duration}
            </span>
          </div>
        )}

        {/* Social Media Stats Badge */}
        {item.type === "social" && item.stats && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
            <Eye className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium">{item.stats}</span>
          </div>
        )}

        {/* Play Button for Videos */}
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Play className="w-6 h-6 text-white fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Hover Overlay for Websites */}
        {item.type === "website" && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
              <ExternalLink className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">View Site</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
            {item.title}
          </h3>
        </div>

        {item.client && (
          <p className="text-purple-400 text-sm font-medium mb-2">
            {item.client}
          </p>
        )}

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-medium text-purple-300 bg-purple-500/20 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Platform Badge for Social */}
        {item.platform && (
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
            {item.platform}
          </span>
        )}

        {/* Category Badge for Products */}
        {item.category && (
          <span className="inline-block px-3 py-1 text-xs font-medium text-orange-300 bg-orange-500/20 rounded-md">
            {item.category}
          </span>
        )}

        {/* Video Type */}
        {item.type === "video" && item.type && (
          <span className="inline-block px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-500/20 rounded-md">
            {item.type}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
