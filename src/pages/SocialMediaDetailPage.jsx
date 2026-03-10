import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { portfolioData } from "../data/portfolioData";
import {
  ArrowLeft,
  TrendingUp,
  Target,
  BarChart3,
  CheckCircle2,
  Users,
  MessageSquare,
  Share2,
  Sparkles,
} from "lucide-react";
import { useEffect } from "react";

const SocialMediaDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = portfolioData.socialMedia.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-text-main mb-4">
            Campaign Not Found
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

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-bg-secondary/60 shadow-2xl group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[500px] object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue shadow-lg`}>
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold">
                    {item.platform}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {item.title}
                </h1>
                <p className="text-white/80 font-medium text-lg italic">
                  For {item.client}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border border-accent-purple/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-semibold bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
                Case Study Analysis
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-6">
              The <span className="text-accent-purple">Challenge</span> & Overview
            </h2>
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              {item.analysis.overview}
            </p>

            <div className="p-6 rounded-3xl bg-white border border-bg-secondary shadow-sm mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent-blue/10">
                  <Target className="w-5 h-5 text-accent-blue" />
                </div>
                <h3 className="text-xl font-bold text-text-main">Our Strategy</h3>
              </div>
              <p className="text-text-muted leading-relaxed">
                {item.analysis.strategy}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Results Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <TrendingUp className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-text-main">Campaign Impact</h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {item.analysis.results.map((result, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-white border border-bg-secondary shadow-sm text-center group transition-all duration-300 hover:border-accent-purple/20"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  {result.value}
                </div>
                <p className="text-sm font-bold text-text-muted uppercase tracking-wider">
                  {result.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-accent-pink/10">
                <CheckCircle2 className="w-5 h-5 text-accent-pink" />
              </div>
              <h2 className="text-3xl font-bold text-text-main">Execution Details</h2>
            </div>
            
            <div className="space-y-4">
              {item.analysis.breakdown.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-bg-secondary/40 border border-bg-secondary hover:border-accent-purple/20 transition-all">
                  <div className="mt-1">
                    <CheckCircle2 className="w-5 h-5 text-accent-purple" />
                  </div>
                  <p className="text-text-main font-medium">{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="p-10 rounded-[3rem] bg-gradient-to-br from-bg-secondary to-bg-main border border-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               
               <h3 className="text-2xl font-bold text-text-main mb-6">Let's Duplicate These Results for Your Brand</h3>
               <p className="text-text-muted mb-8 text-lg">
                 Our social media strategies are tailored to each client's unique voice and goals. We don't just post content; we build communities.
               </p>
               
               <div className="space-y-6 mb-10">
                 <div className="flex items-center gap-4">
                   <Users className="w-6 h-6 text-accent-blue" />
                   <div>
                     <p className="font-bold text-text-main tracking-tight">Community Building</p>
                     <p className="text-sm text-text-muted">Turning followers into brand advocates</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <BarChart3 className="w-6 h-6 text-accent-purple" />
                   <div>
                     <p className="font-bold text-text-main tracking-tight">Data-Driven Growth</p>
                     <p className="text-sm text-text-muted">Continuous optimization based on analytics</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <MessageSquare className="w-6 h-6 text-accent-pink" />
                   <div>
                     <p className="font-bold text-text-main tracking-tight">Strategic Content</p>
                     <p className="text-sm text-text-muted">High-performing creative that converts</p>
                   </div>
                 </div>
               </div>

               <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-bold shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/40 transition-all duration-300"
               >
                 Book Your Strategy Session
               </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDetailPage;
