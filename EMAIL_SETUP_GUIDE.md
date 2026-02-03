# Email Setup Guide for N9ne Agency Contact Form

This guide will help you set up automated emails for your contact form using EmailJS (free service).

## Overview

When a customer submits the contact form:
1. **You (n9ne.eg1@gmail.com)** receive a notification with customer details
2. **The customer** receives an automatic confirmation email

---

## Step-by-Step Setup

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (top right)
3. Create account with any email
4. Verify your email address

---

### 2. Connect Your Gmail Account

1. In EmailJS dashboard, go to **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with **n9ne.eg1@gmail.com**
6. Allow EmailJS permissions
7. **Save the Service ID** (something like `service_abc123`)

---

### 3. Create Admin Notification Template

This template sends customer messages to you.

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Configure as follows:

**Template Name:** `Admin Notification`

**Template ID:** Copy this for later (something like `template_abc123`)

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #667eea; }
        .label { font-weight: bold; color: #667eea; }
        .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 New Contact Form Submission</h1>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">👤 Name:</span> {{from_name}}
            </div>
            <div class="field">
                <span class="label">📧 Email:</span> {{from_email}}
            </div>
            <div class="field">
                <span class="label">📱 Phone:</span> {{phone}}
            </div>
            <div class="field">
                <span class="label">🎯 Service:</span> {{service}}
            </div>
            <div class="field">
                <span class="label">💬 Message:</span><br>
                {{message}}
            </div>
            <div class="field">
                <span class="label">🕐 Submitted:</span> {{submitted_at}}
            </div>
        </div>
        <div class="footer">
            <p>This message was sent via the N9ne Agency contact form</p>
        </div>
    </div>
</body>
</html>
```

**Settings:**
- **To Email:** `n9ne.eg1@gmail.com` (your email)
- **From Name:** `{{from_name}}` (customer's name)
- **From Email:** `noreply@emailjs.com`
- **Reply To:** `{{from_email}}` (customer's email - so you can reply directly)

4. Click **"Save"**

---

### 4. Create Customer Confirmation Template

This template confirms receipt to the customer.

1. Click **"Create New Template"** again
2. Configure as follows:

**Template Name:** `Customer Confirmation`

**Template ID:** Copy this for later

**Subject:**
```
Thank You for Contacting N9ne Agency! 🎨
```

**Content (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; }
        .details { background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
        .footer { background: #333; color: white; padding: 30px 20px; text-align: center; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        h1 { margin: 0; font-size: 28px; }
        h3 { color: #667eea; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎨 N9ne Agency</h1>
            <p style="font-size: 18px; margin: 10px 0 0 0;">Thank You for Reaching Out!</p>
        </div>

        <div class="content">
            <p>Dear <strong>{{to_name}}</strong>,</p>

            <p>Thank you for contacting N9ne Agency! We're excited to learn more about your project.</p>

            <p>✅ <strong>We have received your message and our team will get back to you within 24 hours.</strong></p>

            <div class="details">
                <h3>📋 Your Submission Details:</h3>
                <p><strong>Service:</strong> {{service}}</p>
                <p><strong>Your Message:</strong><br>{{message}}</p>
            </div>

            <p>In the meantime, feel free to explore our services or follow us on social media to see our latest work!</p>

            <center>
                <a href="https://yourwebsite.com" class="button">Visit Our Website</a>
            </center>
        </div>

        <div class="footer">
            <h3 style="color: white; margin-top: 0;">N9ne Agency</h3>
            <p>📍 Cairo, Egypt</p>
            <p>📧 n9ne.eg1@gmail.com | 📱 +1 (234) 567-890</p>
            <p style="margin-top: 20px; font-size: 12px; color: #aaa;">
                © 2025 N9ne Agency. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
```

**Settings:**
- **To Email:** `{{to_email}}` (customer's email)
- **From Name:** `N9ne Agency`
- **From Email:** `noreply@emailjs.com`
- **Reply To:** `n9ne.eg1@gmail.com` (your email)

3. Click **"Save"**

---

### 5. Get Your Public Key

1. Go to **"Account"** section (left sidebar)
2. Find **"Public Key"** (under API Keys)
3. Copy the public key (looks like `abcdefg123456789`)

---

### 6. Update Configuration File

1. Open `src/config/emailConfig.js`
2. Replace the placeholder values:

```javascript
export const emailConfig = {
  serviceId: "service_abc123",              // Your Service ID from step 2
  publicKey: "your_public_key_here",        // Your Public Key from step 5
  adminTemplateId: "template_admin_001",    // Admin template ID from step 3
  customerTemplateId: "template_cust_001",  // Customer template ID from step 4
};
```

**Example:**
```javascript
export const emailConfig = {
  serviceId: "service_j8k9l0m",
  publicKey: "hG7kL9mN2pQ5rS",
  adminTemplateId: "template_7y8z9a0",
  customerTemplateId: "template_3x4y5z6",
};
```

3. Save the file

---

## Testing

1. Start your development server:
```bash
npm run dev
```

2. Go to the Contact page
3. Fill out the form with your email as a test
4. Submit the form
5. Check both:
   - **Your inbox (n9ne.eg1@gmail.com)** - should receive customer details
   - **Test customer email** - should receive confirmation

---

## Troubleshooting

### "Email service not configured" error
- Make sure you updated `emailConfig.js` with your actual IDs
- Verify all 4 values are correct (serviceId, publicKey, adminTemplateId, customerTemplateId)

### Emails not arriving
- Check EmailJS dashboard "Logs" section for errors
- Verify your Gmail is connected in EmailJS
- Check spam/junk folders
- Ensure template IDs match exactly

### "Template not found" error
- Double-check template IDs in EmailJS dashboard
- Copy and paste IDs carefully (they're case-sensitive)

### Free Tier Limits
- EmailJS free plan: 200 emails/month
- Perfect for starting out
- Upgrade if you need more

---

## Security Notes

✅ **Safe to commit:** The public key and template IDs are safe to include in your code

❌ **Never commit:** Private API keys (we're not using any)

---

## Support

If you need help:
1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Contact EmailJS support
3. Review the error messages in the browser console

---

## What Happens When Form is Submitted

```
Customer fills form → Submit
                 ↓
         EmailJS processes
         /              \
        /                \
   Admin Email      Confirmation Email
   (to you)         (to customer)
       ↓                   ↓
  n9ne.eg1@gmail.com   customer@email.com
```

Both emails are sent automatically and simultaneously!
