import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu and scroll to top when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Menu item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-0 left-0 w-full z-50 py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center text-text-main">
            <img
              src="../../image/Logo/N9NE.png"
              alt="N9ne Agency"
              className="h-30 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-text-muted hover:text-text-main transition-colors duration-200 text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact">
              <button className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded sm:rounded border border-white/20 shadow-[0_8px_30px_rgb(124,58,237,0.2)] hover:shadow-[0_8px_30px_rgb(124,58,237,0.4)] hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text-main p-2"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden mt-4 overflow-hidden bg-bg-main rounded-xl border border-bg-secondary shadow-lg shadow-bg-secondary"
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={link.path}
                      className="block text-text-muted hover:text-text-main px-4 py-3 rounded-lg hover:bg-bg-secondary transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  custom={navLinks.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full relative inline-flex items-center justify-center px-8 py-4 mt-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue rounded-2xl border border-white/20 shadow-lg shadow-accent-purple/20 hover:shadow-xl hover:shadow-accent-purple/40 active:scale-95">
                      Get Started
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
