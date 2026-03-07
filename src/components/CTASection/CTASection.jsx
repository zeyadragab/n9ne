import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent-pink/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-bg-main backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-bg-secondary shadow-xl shadow-accent-purple/10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-purple/5 via-accent-pink/5 to-accent-blue/5 border border-accent-purple/20 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-5 h-5 text-accent-purple" />
            <span className="text-sm font-semibold bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main mb-6 leading-tight"
          >
            Let's Create Something
            <span className="block bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
              Amazing Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-text-muted mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Join hundreds of successful brands who trust N9ne Agency to elevate their digital presence and drive real, measurable results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>

            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 text-sm sm:text-base font-bold text-text-main transition-all duration-300 bg-bg-secondary/50 backdrop-blur-md rounded-2xl border border-accent-purple/30 hover:bg-bg-main hover:border-accent-purple/60 hover:shadow-[0_8px_30px_rgb(124,58,237,0.1)]"
              >
                View Our Services
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-text-muted text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Fast Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-purple rounded-full animate-pulse"></div>
              <span>150+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-blue rounded-full animate-pulse"></div>
              <span>95% Success Rate</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
