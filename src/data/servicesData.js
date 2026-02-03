import {
  Code,
  Share2,
  Video,
  Camera,
  Film,
  Users,
  Palette,
  Cog,
  Workflow,
} from "lucide-react";

export const servicesData = [
  {
    id: 1,
    title: "Website Development",
    slug: "website-development",
    shortDescription:
      "Custom responsive websites that convert visitors to customers with modern design and seamless functionality",
    fullDescription:
      "Our website development service delivers cutting-edge, responsive websites tailored to your business needs. We combine stunning design with robust functionality to create digital experiences that engage visitors and drive conversions. From e-commerce platforms to corporate websites, we build scalable solutions using the latest technologies and best practices.",
    image:
      "https://media.licdn.com/dms/image/v2/D5612AQF9fKQ6CQfUzg/article-cover_image-shrink_720_1280/B56ZXync45GUAI-/0/1743532184578?e=2147483647&v=beta&t=JJAIHwSW1hJGPJQ9Q_JfnMmyYmUV6-6PefA2inN39qs",
    icon: Code,
    color: "from-purple-600 to-blue-600",
    features: [
      "Responsive Design for All Devices",
      "SEO Optimized Structure",
      "Fast Loading Performance",
      "Modern UI/UX Design",
      "Cross-browser Compatibility",
      "Content Management System",
      "Security & SSL Integration",
      "Ongoing Support & Maintenance",
    ],
    technologies: ["React", "Next.js", "Node.js", "Tailwind CSS", "MongoDB"],
    pricing: "Starting from $100",
  },
  {
    id: 2,
    title: "Social Media Management",
    slug: "social-media-management",
    shortDescription:
      "Strategic social media campaigns across all platforms to grow your audience and engagement",
    fullDescription:
      "Transform your social media presence with our comprehensive management services. We create engaging content, manage your community, and run targeted campaigns across all major platforms. Our data-driven approach ensures maximum reach and engagement, helping you build a loyal audience and achieve your business goals.",
    image:
      "https://thetrafficverse.com/wp-content/uploads/2024/12/Lead-Generation.webp",
    icon: Share2,
    color: "from-pink-600 to-purple-600",
    features: [
      "Content Strategy & Planning",
      "Daily Posting Schedule",
      "Community Engagement",
      "Hashtag Research & Strategy",
      "Analytics & Reporting",
      "Paid Ad Campaign Management",
      "Influencer Collaboration",
      "Brand Monitoring",
    ],
    technologies: [
      "Facebook",
      "Instagram",
      "Twitter",
      "LinkedIn",
      "TikTok",
      "Pinterest",
    ],
    pricing: "Starting from $50/month",
  },
  {
    id: 3,
    title: "Video Editing",
    slug: "video-editing",
    shortDescription:
      "Professional video content that engages and converts with cinematic quality editing",
    fullDescription:
      "Elevate your video content with professional editing services that captivate audiences. We transform raw footage into polished, engaging videos optimized for your platform of choice. From corporate presentations to social media content, we deliver high-quality edits that tell your story and drive results.",
    image:
      "https://brv.us.com/wp-content/uploads/2025/05/pexels-photo-31718971.jpeg",
    icon: Video,
    color: "from-blue-600 to-cyan-600",
    features: [
      "Professional Color Grading",
      "Motion Graphics & Effects",
      "Sound Design & Mixing",
      "Subtitle & Caption Creation",
      "Platform-Specific Optimization",
      "Fast Turnaround Time",
      "Multiple Revision Rounds",
      "HD/4K Export Quality",
    ],
    technologies: [
      "Adobe Premiere Pro",
      "After Effects",
      "DaVinci Resolve",
      "Final Cut Pro",
    ],
    pricing: "Starting from $10 per video",
  },
  {
    id: 4,
    title: "Photography",
    slug: "photography",
    shortDescription:
      "High-quality product and brand photography that captures your vision perfectly",
    fullDescription:
      "Professional photography services that showcase your brand in the best light. Whether it's product photography, corporate headshots, or brand lifestyle images, we capture stunning visuals that resonate with your audience. Our experienced photographers use top-tier equipment and creative vision to deliver images that stand out.",
    image:
      "https://images.pexels.com/photos/20223012/pexels-photo-20223012.jpeg?cs=srgb&dl=pexels-amar-20223012.jpg&fm=jpg",
    icon: Camera,
    color: "from-purple-600 to-pink-600",
    features: [
      "Product Photography",
      "Corporate Headshots",
      "Lifestyle & Brand Photography",
      "Event Coverage",
      "Professional Retouching",
      "High-Resolution Files",
      "Commercial Usage Rights",
      "On-location or Studio Shoots",
    ],
    technologies: ["Canon", "Sony", "Nikon", "Adobe Lightroom", "Photoshop"],
    pricing: "Starting from $100 per session",
  },
  {
    id: 5,
    title: "Videography",
    slug: "videography",
    shortDescription:
      "Cinematic video production for your brand with professional equipment and creative vision",
    fullDescription:
      "Create powerful visual stories with our professional videography services. From concept to final delivery, we produce cinematic-quality videos that capture your brand's essence. Our team handles everything from pre-production planning to on-site filming and post-production editing, ensuring a seamless experience.",
    image:
      "https://images.pexels.com/photos/4064838/pexels-photo-4064838.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200",
    icon: Film,
    color: "from-indigo-600 to-purple-600",
    features: [
      "4K & HD Video Production",
      "Multi-Camera Setup",
      "Drone Footage",
      "Professional Lighting & Audio",
      "Scriptwriting & Storyboarding",
      "Location Scouting",
      "Live Event Coverage",
      "Promotional Video Creation",
    ],
    technologies: [
      "Red Camera",
      "DJI Drones",
      "Gimbal Stabilizers",
      "Professional Audio Equipment",
    ],
    pricing: "Starting from $50 per day",
  },
  {
    id: 6,
    title: "Community Management",
    slug: "community-management",
    shortDescription:
      "Expert moderation and community engagement to build loyal brand advocates",
    fullDescription:
      "Build and nurture a thriving online community with our expert management services. We monitor conversations, engage with your audience, handle customer inquiries, and foster positive relationships that turn followers into brand advocates. Our proactive approach ensures your community remains active, positive, and growing.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&crop=entropy&auto=format&q=80",
    icon: Users,
    color: "from-blue-600 to-indigo-600",
    features: [
      "24/7 Community Monitoring",
      "Member Engagement & Interaction",
      "Content Moderation",
      "Conflict Resolution",
      "Community Guidelines Enforcement",
      "Regular Events & Activities",
      "Feedback Collection & Analysis",
      "Growth Strategy Implementation",
    ],
    technologies: ["Discord", "Slack", "Facebook Groups", "Reddit", "Forums"],
    pricing: "Starting from $200/month",
  },
  {
    id: 7,
    title: "Poster Design",
    slug: "poster-design",
    shortDescription:
      "Eye-catching graphic design for all your marketing and branding needs",
    fullDescription:
      "Make a lasting impression with our professional poster and graphic design services. We create visually stunning designs that communicate your message effectively and capture attention. From marketing materials to event posters, our designs combine creativity with strategic thinking to deliver results.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOU269pEbXaj1NtGrzq8Uggxl7tD5t3chjDA&s",
    icon: Palette,
    color: "from-pink-600 to-rose-600",
    features: [
      "Custom Graphic Design",
      "Marketing Material Creation",
      "Event Poster Design",
      "Social Media Graphics",
      "Brand Identity Design",
      "Print-Ready Files",
      "Multiple Format Delivery",
      "Unlimited Revisions",
    ],
    technologies: [
      "Adobe Illustrator",
      "Photoshop",
      "InDesign",
      "Figma",
      "Canva Pro",
    ],
    pricing: "Starting from $20 per design",
  },
  {
    id: 8,
    title: "ERP Solutions",
    slug: "erp-solutions",
    shortDescription:
      "Comprehensive ERP solutions to streamline your business processes and improve efficiency",
    fullDescription:
      "Transform your business operations with our comprehensive ERP solutions. We implement and customize enterprise resource planning systems that integrate all your business processes into one unified platform. From inventory management to financial reporting, our ERP solutions provide real-time insights and streamline operations across your organization.",
    image:
      "https://img.freepik.com/free-vector/gradient-erp-illustration_23-2149379179.jpg",
    icon: Cog,
    color: "from-orange-600 to-red-600",
    features: [
      "Custom ERP Implementation",
      "Business Process Integration",
      "Inventory Management",
      "Financial Reporting & Analytics",
      "Supply Chain Management",
      "HR & Payroll Integration",
      "Real-time Data Synchronization",
      "Training & Support",
    ],
    technologies: ["SAP", "Oracle", "Microsoft Dynamics", "Odoo", "Custom ERP"],
    pricing: "Custom pricing - Contact us",
  },
  {
    id: 9,
    title: "N8N Automation Models",
    slug: "n8n-automation",
    shortDescription:
      "Automated workflows and business process automation using N8N platform",
    fullDescription:
      "Automate your business processes and boost productivity with custom N8N automation workflows. We design and implement sophisticated automation models that connect your tools, eliminate repetitive tasks, and streamline operations. From simple triggers to complex multi-step workflows, we help you work smarter, not harder.",
    image:
      "https://n8n-automation.com/wp-content/uploads/2024/01/head_new-1.jpeg?w=1024",
    icon: Workflow,
    color: "from-green-600 to-teal-600",
    features: [
      "Custom Workflow Design",
      "Multi-Platform Integration",
      "Data Synchronization",
      "Automated Email & Notifications",
      "CRM Automation",
      "Task Scheduling",
      "Error Handling & Monitoring",
      "Scalable Solutions",
    ],
    technologies: [
      "N8N",
      "Zapier",
      "Make (Integromat)",
      "API Integration",
      "Webhooks",
    ],
    pricing: "Starting from $100 per workflow",
  },
];
