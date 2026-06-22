#Thamarai Charitable Trust Foundation |  தாமரை அறக்கட்டளை தொண்டு நிறுவனம்

A modern, responsive, and feature-rich web application built for the **Thamarai Charitable Trust Foundation**. This portal serves as a central hub for community engagement, offering public registrations, member portals, blood donation matching, donation processing, and a robust administrator control panel.

---

## 🌟 Key Features

### 1. Public Portal & Community Services
* **Membership Registration**: Public application form to register as a Member or Active Member, featuring automated uploads for profile photos and Government ID proofs.
* **Blood Donation Registry**: Public registration form for blood donors to sign up for voluntary emergency donation.
* **Blood Request Portal**: Urgent blood request submission form for patients, hospital location details, and units needed.
* **Donations Portal**: Donation intake form with real-time QR Code scanning and UPI details mapping.
* **Grievance (Problem) Reporting**: Public ticket filing system for community problems, providing auto-generated tracking numbers and category tags.

### 2. Member Portal
* **Secure Login**: Authentication system for approved members to access their dashboard.
* **Digital Member ID Card**: Dynamic, client-side generation and rendering of official membership ID cards with downloadable templates.

### 3. Admin Dashboard Control Panel
* **Applicant Screening**: View member registration queues, inspect uploaded Government proofs via signed secure links, and approve/reject applicants with automated EmailJS notifications.
* **Service Tracking**: View, filter, and delete Blood Requests, Blood Donors, Grievance tickets, and Feedback messages.
* **CMS Content Manager**: Live updates for announcements, testimonials, image galleries, and YouTube video grids.
* **Real-time Analytics**: Quick statistics view for total members, pending approvals, and active requests.
* **Bilingual Excel Export**: One-click bulk exports of all database lists (Members, Donors, Requests, Donations, Grievances) to Excel/CSV with clean bilingual columns.

---

## 🛠️ Technology Stack

* **Frontend**: HTML5, Vanilla CSS3 (Custom Properties theme system), JavaScript (ES Modules).
* **Backend Database**: Firebase Firestore.
* **Authentication**: Firebase Authentication.
* **Storage**: Supabase Storage (used for storing photos, government proofs, signature assets, QR codes, and event images).
* **Security**: Firebase App Check (reCAPTCHA v3 verification).
* **Email Alerts**: EmailJS integration for admin alerts on new grievances/members and applicant approval emails.

---

## 📁 Directory Structure

```text
├── assets/                    # External library assets and static styling resources
├── css/                       # Page-specific stylesheets
│   ├── admin.css              # Styling for admin login & dashboard panels
│   └── style.css              # Global styling & layout tokens
├── documents/                 # PDF manuals and documentation assets
├── images/                    # UI icons, default avatars, background images
├── js/                        # App logic
│   ├── firebase/              # Firebase configuration, Auth & Firestore services
│   ├── pages/                 # Page-specific handlers (login, dashboard, donations)
│   └── utils/                 # Email templates, validations, and helper utilities
├── index.html                 # Homepage
├── admin-login.html           # Admin Dashboard gate
├── admin-dashboard.html       # Admin Panel layout
├── member-login.html          # Member authentication gateway
├── id-card-template.html      # Member ID Card generator canvas
├── join-contact.html          # Member registration, grievances, and contact form
├── blood-donation.html        # Donor registration form
├── blood-request.html         # Blood requests filing form
├── donate.html                # Donation and QR Code gateway
└── events.html                # Event views and registration form
```
