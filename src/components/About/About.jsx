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
      className="py-24 bg-gradient-to-b from-black via-purple-950/30 to-black relative overflow-hidden"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Enhanced Background elements */}
      <div className="absolute top-10 left-0 w-40 h-40 bg-purple-600 rounded-full opacity-20 blur-3xl will-change-transform animate-pulse"></div>
      <div className="absolute bottom-20 right-0 w-56 h-56 bg-blue-600 rounded-full opacity-20 blur-3xl will-change-transform animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-pink-600 rounded-full opacity-20 blur-3xl will-change-transform animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/3 left-1/4 w-36 h-36 bg-indigo-600 rounded-full opacity-15 blur-3xl will-change-transform animate-pulse" style={{animationDelay: '1.5s'}}></div>

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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            About <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">N9ne Agency</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed"
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
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600 rounded-3xl transform rotate-3 opacity-20 will-change-transform"></div>
            <div className="relative bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/30">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96">
                <img
                  src="/image/TeamService.jpg"
                  alt="N9ne Agency Logo"
                  className="h-auto w-auto" // Adjust height as needed
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h3 className="text-white text-xl font-bold">
                  Our team at work
                </h3>
                <p className="text-gray-300 mt-1">
                  Creating winning strategies for your brand
                </p>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl shadow-lg shadow-purple-500/40"
            >
              <div className="flex items-center">
                <div className="bg-white text-purple-600 rounded-full w-12 h-12 flex items-center justify-center">
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
              className="text-gray-300 mb-6 text-lg"
            >
              Founded in 2023,{" "}
              <span className="font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">N9ne Agency</span>{" "}
              emerged from a simple idea: social media marketing should be
              strategic, measurable, and results-driven. We're not satisfied
              with vanity metrics - we focus on what truly grows your business.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 mb-8 text-lg"
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
                  className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6 rounded-2xl text-center shadow-xl shadow-purple-500/30 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white text-sm font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Our Core Values
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-md p-6 rounded-2xl border-2 border-purple-500/40 shadow-lg hover:shadow-2xl hover:shadow-purple-500/40 hover:border-purple-400/60 transition-all duration-300"
                  >
                    <div className="text-purple-400 mb-3 transform hover:scale-110 transition-transform duration-300">{value.icon}</div>
                    <h4 className="font-bold text-xl mb-2 text-white">{value.title}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
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
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group bg-gradient-to-r from-purple-900 to-indigo-900 text-white px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 border border-purple-500/30 hover:border-purple-400/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Our Success Stories
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated team section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-white">
            Meet Our Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-gray-800 border-2 border-purple-500/50 rounded-full w-24 h-24" />
                </div>
                <div className="pt-16 pb-6 px-6 text-center">
                  <h4 className="font-bold text-xl text-white">Zeyad Ragab</h4>
                  <p className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium">CEO & Founder</p>
                  <p className="text-gray-300 mt-3">
                    Digital marketing expert with 10+ years of experience
                    scaling brands
                  </p>

                  <div className="flex justify-center space-x-3 mt-4">
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-md"
                    >
                      <i className="fab fa-linkedin-in text-sm"></i>
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white flex items-center justify-center hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-md"
                    >
                      <i className="fab fa-twitter text-sm"></i>
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-md"
                    >
                      <i className="fas fa-envelope text-sm"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
