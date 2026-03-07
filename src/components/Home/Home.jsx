// src/components/Hero.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Create scroll-based transformations
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yIllustration = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scaleIllustration = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacitySection = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="min-h-screen pt-32 pb-20 md:pt-48 md:pb-32 relative overflow-hidden flex items-center bg-bg-main"
      style={{ opacity: opacitySection, transform: 'translateZ(0)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            className="text-text-main space-y-8"
            style={{ y: yText }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-purple/10 via-accent-pink/10 to-accent-blue/10 border border-accent-purple/20 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span className="text-sm font-medium bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
                #1 Digital Marketing Agency
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-text-main"
              >
                Transform Your
                <span className="block bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
                  Digital Presence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-text-muted max-w-xl"
              >
                We create powerful digital experiences that drive growth, engagement, and results for your brand.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { value: "150+", label: "Projects" },
                { value: "95%", label: "Success Rate" },
                { value: "24/7", label: "Support" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)]"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>

              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 text-sm sm:text-base font-bold text-text-main transition-all duration-300 bg-bg-secondary/50 backdrop-blur-md rounded-2xl border border-accent-purple/30 hover:bg-bg-main hover:border-accent-purple/60 hover:shadow-[0_8px_30px_rgb(124,58,237,0.1)]"
              >
                View Our Work
              </motion.a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-sm text-text-muted">Growing Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-text-muted">Quick Delivery</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Illustration / Visual */}
          <motion.div
            className="relative mt-12 md:mt-0 h-[500px] md:h-[600px]"
            style={{
              y: yIllustration,
              scale: scaleIllustration,
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Animated 3D-like cards */}
            <div className="relative w-full h-full">
              {/* Main card */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-bg-secondary/40 backdrop-blur-xl rounded-3xl border border-accent-purple/20 shadow-2xl shadow-accent-purple/10 p-8"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-blue rounded-2xl mb-4 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-main mb-2">Digital Excellence</h3>
                    <p className="text-text-muted">Crafting exceptional digital experiences</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gradient-to-r from-accent-purple to-accent-pink rounded-full"></div>
                    <div className="h-2 bg-gradient-to-r from-accent-pink to-accent-blue rounded-full w-3/4"></div>
                    <div className="h-2 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full w-1/2"></div>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 backdrop-blur-xl rounded-2xl border border-accent-purple/20 flex items-center justify-center shadow-lg"
              >
                <TrendingUp className="w-12 h-12 text-accent-purple" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-10 left-10 w-28 h-28 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 backdrop-blur-xl rounded-2xl border border-accent-blue/20 flex items-center justify-center shadow-lg"
              >
                <Zap className="w-10 h-10 text-accent-blue" />
              </motion.div>

              {/* Rotating ring */}
              <motion.div
                style={{ rotate }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-dashed border-accent-purple/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background elements with parallax effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-bg-tertiary to-bg-main opacity-90"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-10 will-change-transform"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 will-change-transform"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-accent-pink rounded-full mix-blend-multiply filter blur-3xl opacity-10 will-change-transform"></div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-sm text-text-muted group-hover:text-accent-purple transition-colors">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-accent-purple/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 bg-gradient-to-b from-accent-purple to-accent-blue rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
