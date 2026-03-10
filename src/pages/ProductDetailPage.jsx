import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { portfolioData } from "../data/portfolioData";
import {
  ArrowLeft,
  Camera,
  Layers,
  Zap,
  CheckCircle2,
  Maximize2,
  Image as ImageIcon,
  Palette,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = portfolioData.productImages.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Project Not Found
          </h1>
          <button
            onClick={() => navigate("/portfolio")}
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue text-white rounded-lg hover:scale-105 transition-transform shadow-md"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main">
      {/* Background Effects */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-accent-purple/5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/portfolio")}
          className="flex items-center gap-2 text-accent-purple hover:text-accent-blue transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Portfolio</span>
        </motion.button>

        {/* Showcase Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className="relative rounded-[2.5rem] overflow-hidden border border-bg-secondary/60 shadow-2xl group cursor-zoom-in">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              
              {/* Category Tag */}
              <div className="absolute top-8 left-8">
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
                   <div className="p-1.5 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue">
                     <Camera className="w-4 h-4 text-white" />
                   </div>
                   <span className="text-white text-sm font-bold tracking-wide uppercase">{item.category}</span>
                 </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {item.title}
                </h1>
                <div className="flex items-center gap-4 text-white/70">
                    <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">{item.client}</span>
                    <div className="flex items-center gap-1.5">
                       <Maximize2 className="w-4 h-4" />
                       <span className="text-sm font-medium">8K Resolution</span>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:pt-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border border-accent-purple/20 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
                Technical Spotlight
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-text-main mb-8 leading-tight">
              Mastering the <span className="text-accent-blue">Visual Narrative</span>
            </h2>
            
            <div className="space-y-8">
                <div>
                   <h3 className="text-xl font-bold text-text-main flex items-center gap-2 mb-4">
                      <Layers className="w-5 h-5 text-accent-purple" />
                      Client Objective
                   </h3>
                   <p className="text-lg text-text-muted leading-relaxed">
                      {item.analysis.overview}
                   </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-white border border-bg-secondary shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                   <h3 className="text-xl font-bold text-text-main flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-accent-blue" />
                      Creative Execution
                   </h3>
                   <p className="text-text-muted leading-relaxed relative z-10">
                      {item.analysis.strategy}
                   </p>
                </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Specs / Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {item.analysis.results.map((result, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-10 rounded-3xl bg-bg-secondary/30 border border-white shadow-sm text-center group transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-accent-purple to-accent-blue bg-clip-text text-transparent mb-3">
                  {result.value}
                </div>
                <p className="text-xs font-black text-text-muted uppercase tracking-[0.2em]">
                  {result.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Workflow Details */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 rounded-2xl bg-accent-purple/10">
                <Palette className="w-6 h-6 text-accent-purple" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-main">The Precision Workflow</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {item.analysis.breakdown.map((point, idx) => (
                <motion.div 
                    key={idx} 
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-bg-secondary group transition-all"
                >
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-purple group-hover:scale-125 transition-transform" />
                  </div>
                  <p className="text-text-main font-semibold leading-snug">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
             <div className="relative p-12 rounded-[3.5rem] bg-text-main text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                
                <div className="relative z-10">
                   <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 w-fit mb-8 border border-white/20">
                      <ImageIcon className="w-8 h-8 text-accent-blue" />
                   </div>
                   <h3 className="text-3xl font-bold mb-6 leading-tight">Elevate Your Product Presentation</h3>
                   <p className="text-white/70 text-lg mb-10 leading-relaxed">
                     In the digital marketplace, your photos are your ambassadors. We provide the technical excellence and creative vision to make them unforgettable.
                   </p>
                   
                   <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/contact")}
                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-bold text-lg shadow-2xl hover:brightness-110 transition-all"
                   >
                     Transform Your Catalog
                   </motion.button>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
