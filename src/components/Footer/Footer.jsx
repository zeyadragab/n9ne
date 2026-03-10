import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/181B3AbDfS/?mibextid=wwXIfr",
      label: "Facebook",
    },
    { icon: Twitter, href: "#", label: "Twitter" },
    {
      icon: Instagram,
      href: "https://www.instagram.com/n9ne.eg1/",
      label: "Instagram",
    },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-bg-secondary border-t border-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <div>
            <img
              src="/image/Logo/white-logo.png"
              alt="N9ne Agency"
              className="h-10 mb-4 invert opacity-80"
            />
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              Transform your digital presence with innovative strategies and
              creative solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-bg-main border border-accent-purple/20 flex items-center justify-center text-text-muted hover:text-text-main hover:bg-accent-purple/10 hover:border-accent-purple/40 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-main font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-muted hover:text-text-main text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-text-main font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-accent-purple flex-shrink-0" />
                <a
                  href="mailto:contact@n9neagency.com"
                  className="hover:text-text-main transition-colors"
                >
                  contact@n9neagency.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-accent-purple flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-text-main transition-colors"
                >
                  +20 1010 354 164
                </a>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-purple flex-shrink-0" />
                <span>Egypt, Cairo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-bg-main pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm text-center md:text-left">
            © {currentYear}{" "}
            <span className="text-accent-purple font-semibold">N9ne Agency</span>.
            All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-muted">
            <a href="#" className="hover:text-text-main transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-text-main transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
