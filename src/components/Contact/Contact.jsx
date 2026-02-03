import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { emailConfig, DEMO_MODE } from "../../config/emailConfig";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Users,
  Target,
  Award,
  Zap,
  MessageSquare,
  Calendar,
  Globe,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Meeting scheduler state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const services = [
    "Website Development",
    "Social Media Management",
    "Video Editing",
    "Photography",
    "Videography",
    "Community Management",
    "Poster Design",
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    const startPadding = firstDay.getDay();

    // Add padding days from previous month
    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    // Add current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const isPast = date < today;
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push({
        date,
        day,
        isCurrentMonth: true,
        isPast,
        isSelected,
      });
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const selectDate = (day) => {
    if (!day.date || day.isPast || !day.isCurrentMonth) return;
    setSelectedDate(day.date);
    setSelectedTime(null);
  };

  const selectTime = (time) => {
    setSelectedTime(time);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMessage("Please fill in all required fields");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const currentDate = new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      });

      const meetingDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Not selected";
      const meetingTime = selectedTime || "Not selected";

      // DEMO MODE - Simulate email sending for testing
      if (DEMO_MODE) {
        console.log("📧 DEMO MODE - Email simulation");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📨 Admin Email (to n9ne.eg1@gmail.com):");
        console.log({
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service || "Not specified",
          message: formData.message || "No message provided",
          meeting_date: meetingDate,
          meeting_time: meetingTime,
          submitted_at: currentDate,
        });
        console.log("\n📬 Customer Confirmation Email:");
        console.log({
          to_name: formData.fullName,
          to_email: formData.email,
          service: formData.service || "General Inquiry",
          message: formData.message || "No specific message",
          meeting_date: meetingDate,
          meeting_time: meetingTime,
        });
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("✅ To enable real emails, follow EMAIL_SETUP_GUIDE.md");

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setShowSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setSelectedDate(null);
        setSelectedTime(null);

        setTimeout(() => setShowSuccess(false), 10000);
        return;
      }

      // PRODUCTION MODE - Real EmailJS integration
      emailjs.init(emailConfig.publicKey);

      // 1. Send notification to admin (n9ne.eg1@gmail.com)
      const adminParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service || "Not specified",
        message: formData.message || "No message provided",
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        submitted_at: currentDate,
      };

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.adminTemplateId,
        adminParams,
      );

      // 2. Send confirmation to customer
      const customerParams = {
        to_name: formData.fullName,
        to_email: formData.email,
        service: formData.service || "General Inquiry",
        message: formData.message || "No specific message",
        meeting_date: meetingDate,
        meeting_time: meetingTime,
      };

      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.customerTemplateId,
        customerParams,
      );

      // Success - both emails sent
      setShowSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setSelectedDate(null);
      setSelectedTime(null);

      setTimeout(() => setShowSuccess(false), 10000);
    } catch (error) {
      console.error("Error sending emails:", error);

      // Check if it's a configuration error
      if (
        error.text?.includes("not found") ||
        error.text?.includes("Invalid")
      ) {
        setErrorMessage(
          "Email service not configured. Please check the emailConfig.js file and follow EMAIL_SETUP_GUIDE.md",
        );
      } else {
        setErrorMessage(
          "Failed to send message. Please try again or contact us directly at n9ne.eg1@gmail.com",
        );
      }

      setShowError(true);
      setTimeout(() => setShowError(false), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Target, value: "1,200+", label: "Projects Completed" },
    { icon: Award, value: "15+", label: "Industry Awards" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge solutions that push boundaries",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Premium quality in every project we deliver",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with clients as partners",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description: "Focused on achieving your business goals",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      content: "n9ne.eg1@gmail.com",
      link: "mailto:n9ne.eg1@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+20 1010 354 164",
      link: "tel:+201010354164",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Cairo, Egypt",
      link: "#",
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon - Fri: 9AM - 6PM",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/40 backdrop-blur-sm mb-6"
          >
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Let's Build Something{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your digital presence? We're here to help you
            every step of the way. Reach out and let's start your success story.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/40 text-center hover:border-purple-400/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/30"
              >
                <Icon className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-300 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - About & Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* About Section */}
            <div className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/40 shadow-xl shadow-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  About N9ne Agency
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                N9ne Agency is a full-service digital agency specializing in
                transforming brands through innovative design, strategic
                marketing, and cutting-edge technology. Based in Cairo, Egypt,
                we serve clients globally with a passion for excellence.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our multidisciplinary team of designers, developers, marketers,
                and content creators work collaboratively to deliver exceptional
                results that drive growth and exceed expectations.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/40 hover:border-purple-400/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <Icon className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.link}
                    className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/40 hover:border-purple-400/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 group"
                  >
                    <Icon className="w-6 h-6 text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-sm font-semibold text-gray-400 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-white font-medium">{method.content}</p>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/40 shadow-xl shadow-purple-500/20 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  Send a Message
                </h2>
              </div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-4 mb-6 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-green-100">
                    Message sent successfully! Check your email for
                    confirmation. We'll get back to you within 24 hours.
                  </span>
                </motion.div>
              )}

              {showError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/50 rounded-xl p-4 mb-6 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span className="text-red-100">{errorMessage}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/40 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:bg-black/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/40 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:bg-black/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (234) 567-890"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/40 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:bg-black/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/40 rounded-xl text-white focus:border-purple-400 focus:bg-black/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows="5"
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/40 rounded-xl text-white placeholder-gray-500 focus:border-purple-400 focus:bg-black/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none resize-none"
                  />
                </div>

                {/* Meeting Scheduler */}
                <div className="border-t border-purple-500/20 pt-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule a Meeting (Optional)</span>
                  </div>

                  {/* Calendar */}
                  <div className="bg-black/40 border border-purple-500/40 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <button
                        type="button"
                        onClick={previousMonth}
                        className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <h3 className="text-lg font-bold text-white">
                        {months[currentMonth.getMonth()]}{" "}
                        {currentMonth.getFullYear()}
                      </h3>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-purple-400"
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
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-purple-300 font-semibold py-2 text-xs"
                          >
                            {day}
                          </div>
                        ),
                      )}
                      {generateCalendarDays().map((day, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectDate(day)}
                          disabled={
                            !day.date || day.isPast || !day.isCurrentMonth
                          }
                          className={`
                            p-2 text-sm rounded-lg transition-all duration-200
                            ${
                              !day.date || !day.isCurrentMonth
                                ? "text-gray-600 cursor-default"
                                : day.isPast
                                  ? "text-gray-600 cursor-not-allowed opacity-40"
                                  : "text-white hover:bg-purple-500/30 cursor-pointer"
                            }
                            ${day.isSelected ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold" : ""}
                          `}
                        >
                          {day.date ? day.day : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-black/40 border border-purple-500/40 rounded-xl p-4"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <h4 className="text-sm font-semibold text-white">
                          Available Times for{" "}
                          {selectedDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </h4>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => selectTime(time)}
                            className={`
                              py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                              ${
                                selectedTime === time
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                  : "bg-black/40 text-gray-300 border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500/50"
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-purple-500/50 ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/60"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
      </div>
    </div>
  );
};

export default Contact;
