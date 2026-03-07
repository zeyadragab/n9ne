// src/components/AboutUs.js
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stats = [
    { value: "150+", label: "Happy Clients" },
    { value: "95%", label: "Retention Rate" },
    { value: "12+", label: "Team Experts" },
    { value: "24/7", label: "Support" },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly explore new strategies to keep your brand ahead of the competition.",
      icon: <i className="fas fa-lightbulb text-3xl"></i>,
    },
    {
      title: "Transparency",
      description:
        "Clear communication and honest reporting are at the core of our relationships.",
      icon: <i className="fas fa-chart-line text-3xl"></i>,
    },
    {
      title: "Excellence",
      description:
        "We strive for perfection in every campaign, delivering exceptional results.",
      icon: <i className="fas fa-medal text-3xl"></i>,
    },
    {
      title: "Growth",
      description:
        "Your success is our success - we're committed to scaling your business.",
      icon: <i className="fas fa-seedling text-3xl"></i>,
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-bg-main via-bg-secondary to-bg-main relative overflow-hidden"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Enhanced Background elements */}
      <div className="absolute top-10 left-0 w-40 h-40 bg-accent-purple rounded-full opacity-10 blur-3xl will-change-transform animate-pulse"></div>
      <div
        className="absolute bottom-20 right-0 w-56 h-56 bg-accent-blue rounded-full opacity-10 blur-3xl will-change-transform animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-accent-pink rounded-full opacity-10 blur-3xl will-change-transform animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-main mb-6"
          >
            About{" "}
            <span className="bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent">
              N9ne Agency
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-text-muted max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed"
          >
            We're not just another social media marketing agency - we're your
            strategic growth partner committed to excellence
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent-purple via-accent-pink to-accent-blue rounded-3xl transform rotate-3  will-change-transform"></div>
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 group">
              <div className="w-full h-96 overflow-hidden">
                <img
                  src="/image/TeamService.jpg"
                  alt="N9ne Agency Team"
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                />
                
                {/* Subtle dark scrim for image contrast */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Premium Frosted Glass Badge instead of huge gradient */}
              <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="text-text-main text-lg font-bold">
                    Our team at work
                  </h3>
                  <p className="text-text-muted mt-1 text-sm font-medium">
                    Creating winning strategies for your brand
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-accent-purple to-accent-blue text-white p-4 rounded-xl shadow-lg shadow-accent-purple/30"
            >
              <div className="flex items-center">
                <div className="bg-white text-accent-purple rounded-full w-12 h-12 flex items-center justify-center">
                  <i className="fas fa-trophy text-xl"></i>
                </div>
                <div className="ml-3">
                  <p className="font-bold text-lg">5+ Years</p>
                  <p className="text-sm">Industry Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.p
              variants={itemVariants}
              className="text-text-muted mb-6 text-lg"
            >
              Founded in 2023,{" "}
              <span className="font-bold bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">
                N9ne Agency
              </span>{" "}
              emerged from a simple idea: social media marketing should be
              strategic, measurable, and results-driven. We're not satisfied
              with vanity metrics - we focus on what truly grows your business.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-text-muted mb-8 text-lg"
            >
              Our team of digital natives combines creative thinking with data
              analysis to craft campaigns that convert. We stay ahead of
              algorithm changes and platform updates so you don't have to.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.08, y: -5 }}
                  className="bg-bg-main p-6 rounded-2xl text-center shadow-lg border border-bg-secondary hover:border-accent-purple/30 transition-all duration-300"
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-text-muted text-sm font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-bold text-text-main mb-6">
                Our Core Values
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-bg-main p-6 rounded-2xl border border-bg-secondary shadow-md hover:shadow-xl hover:shadow-accent-purple/10 hover:border-accent-purple/30 transition-all duration-300"
                  >
                    <div className="text-accent-purple mb-3 transform hover:scale-110 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h4 className="font-bold text-xl mb-2 text-text-main">
                      {value.title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex rounded items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)]"
              >
                <span>Our Success Stories</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
