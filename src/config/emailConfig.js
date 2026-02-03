// EmailJS Configuration
// DEMO MODE: Set to false since EmailJS is configured
export const DEMO_MODE = false;

export const emailConfig = {
  serviceId: "service_9eierjl", // Your EmailJS Service ID
  publicKey: "OIanUcjiiKMvBB77S", // Your EmailJS Public Key

  // Template IDs
  adminTemplateId: "template_3ixozap", // Admin notification template
  customerTemplateId: "template_p3qvz5p", // Customer confirmation template

  // Your business email
  adminEmail: "n9ne.eg1@gmail.com",
};

// ==============================================================
// SETUP INSTRUCTIONS:
// ==============================================================

// 1. Create EmailJS Account:
//    - Go to https://www.emailjs.com/
//    - Sign up with your email
//    - Verify your email address

// 2. Add Email Service:
//    - Go to "Email Services" in dashboard
//    - Click "Add New Service"
//    - Select "Gmail"
//    - Connect your Gmail account (n9ne.eg1@gmail.com)
//    - Note down the Service ID

// 3. Create Admin Notification Template:
//    - Go to "Email Templates" in dashboard
//    - Click "Create New Template"
//    - Name it: "Admin Notification"
//    - Subject: "New Contact Form Submission from {{from_name}}"
//    - Body (HTML):
/*
<h2>New Contact Form Submission</h2>
<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Service:</strong> {{service}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
<hr>
<p><em>Submitted at: {{submitted_at}}</em></p>
*/
//    - To Email: n9ne.eg1@gmail.com
//    - From Name: {{from_name}}
//    - Reply To: {{from_email}}
//    - Note down the Template ID

// 4. Create Customer Confirmation Template:
//    - Click "Create New Template" again
//    - Name it: "Customer Confirmation"
//    - Subject: "Thank You for Contacting N9ne Agency!"
//    - Body (HTML):
/*
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px;">
  <h1 style="color: white; text-align: center;">N9ne Agency</h1>
  <h2 style="color: white;">Thank You for Reaching Out!</h2>

  <p>Dear {{to_name}},</p>

  <p>Thank you for contacting N9ne Agency! We have received your message and our team will get back to you within 24 hours.</p>

  <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: white; margin-top: 0;">Your Submission Details:</h3>
    <p><strong>Service:</strong> {{service}}</p>
    <p><strong>Message:</strong> {{message}}</p>
  </div>

  <p>In the meantime, feel free to explore our website or follow us on social media.</p>

  <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3);">
    <p><strong>N9ne Agency</strong></p>
    <p>Cairo, Egypt</p>
    <p>📧 n9ne.eg1@gmail.com | 📱 +1 (234) 567-890</p>
  </div>
</div>
*/
//    - To Email: {{to_email}}
//    - From Name: N9ne Agency
//    - Reply To: n9ne.eg1@gmail.com
//    - Note down the Template ID

// 5. Get Public Key:
//    - Go to "Account" section
//    - Find your Public Key
//    - Copy it

// 6. Update this file:
//    - Replace YOUR_SERVICE_ID with your Service ID
//    - Replace YOUR_PUBLIC_KEY with your Public Key
//    - Replace YOUR_ADMIN_TEMPLATE_ID with Admin template ID
//    - Replace YOUR_CUSTOMER_TEMPLATE_ID with Customer template ID

// ==============================================================
// Example final configuration:
// ==============================================================
/*
export const emailConfig = {
  serviceId: "service_abc123",
  publicKey: "xyz789abc456def",
  adminTemplateId: "template_admin_001",
  customerTemplateId: "template_customer_001",
};
*/
