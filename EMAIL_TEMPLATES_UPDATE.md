# 📧 Updated Email Templates with Meeting Scheduler

Your contact form now includes a meeting scheduler! Update your EmailJS templates to include the meeting date and time.

## 🔄 Update Your EmailJS Templates

Go to https://www.emailjs.com/ and update both templates:

---

### 1. Admin Notification Template

**Template Variables to Add:**
- `{{meeting_date}}` - The selected meeting date
- `{{meeting_time}}` - The selected time slot

**Updated HTML Template:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-left: 4px solid #667eea; }
        .meeting { margin-bottom: 15px; padding: 15px; background: #e8f5e9; border-left: 4px solid #4caf50; }
        .label { font-weight: bold; color: #667eea; }
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

            <!-- NEW: Meeting Information -->
            <div class="meeting">
                <h3 style="margin-top: 0; color: #4caf50;">📅 Meeting Request</h3>
                <p><strong>Date:</strong> {{meeting_date}}</p>
                <p><strong>Time:</strong> {{meeting_time}}</p>
            </div>

            <div class="field">
                <span class="label">🕐 Submitted:</span> {{submitted_at}}
            </div>
        </div>
    </div>
</body>
</html>
```

**Template Settings:**
- To Email: `n9ne.eg1@gmail.com`
- From Name: `{{from_name}}`
- Reply To: `{{from_email}}`
- Subject: `New Contact: {{from_name}} - Meeting on {{meeting_date}}`

---

### 2. Customer Confirmation Template

**Template Variables to Add:**
- `{{meeting_date}}` - The selected meeting date
- `{{meeting_time}}` - The selected time slot

**Updated HTML Template:**

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
        .meeting-box { background: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4caf50; }
        .footer { background: #333; color: white; padding: 30px 20px; text-align: center; border-radius: 0 0 10px 10px; }
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

            <!-- NEW: Meeting Confirmation -->
            <div class="meeting-box">
                <h3 style="color: #4caf50; margin-top: 0;">📅 Meeting Scheduled</h3>
                <p style="font-size: 16px;"><strong>Date:</strong> {{meeting_date}}</p>
                <p style="font-size: 16px;"><strong>Time:</strong> {{meeting_time}}</p>
                <p style="font-size: 14px; color: #666; margin-top: 15px;">
                    📌 We'll send you a confirmation email closer to the meeting time with a video call link or meeting details.
                </p>
            </div>

            <div class="details">
                <h3>📋 Your Submission Details:</h3>
                <p><strong>Service:</strong> {{service}}</p>
                <p><strong>Your Message:</strong><br>{{message}}</p>
            </div>

            <p>In the meantime, feel free to explore our services or follow us on social media!</p>
        </div>

        <div class="footer">
            <h3 style="color: white; margin-top: 0;">N9ne Agency</h3>
            <p>📍 Cairo, Egypt</p>
            <p>📧 n9ne.eg1@gmail.com | 📱 +1 (234) 567-890</p>
            <p style="margin-top: 20px; font-size: 12px; color: #aaa;">© 2025 N9ne Agency. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

**Template Settings:**
- To Email: `{{to_email}}`
- From Name: `N9ne Agency`
- Reply To: `n9ne.eg1@gmail.com`
- Subject: `Meeting Confirmed: {{meeting_date}} at {{meeting_time}} - N9ne Agency`

---

## ✅ What Changed

**New Features:**
1. **Calendar Picker** - Users can select a meeting date
2. **Time Slots** - 9 AM - 5 PM slots available
3. **Optional** - Users can skip meeting scheduling
4. **Email Integration** - Meeting info included in both emails

**Email Variables:**
- `{{meeting_date}}` - "Monday, February 10, 2025" or "Not selected"
- `{{meeting_time}}` - "2:00 PM" or "Not selected"

---

## 🧪 Testing

1. Fill out the contact form
2. Select a date from the calendar
3. Choose a time slot
4. Submit the form
5. Check both emails:
   - Admin email (n9ne.eg1@gmail.com) - should show meeting request
   - Customer email - should show meeting confirmation

---

## 💡 Tips

- Users can submit without selecting a meeting (it will show "Not selected")
- Past dates are automatically disabled
- Only current month dates are selectable
- Time slots are from 9 AM to 5 PM
- Calendar shows current month by default

---

**Your contact form is now a complete booking system!** 🎉
