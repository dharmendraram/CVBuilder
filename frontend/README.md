# ResumeBuilder React Frontend

Modern, simple, and full-featured React.js + Tailwind CSS application for the Resume Builder platform.

## Features & Complete API Integration

1. **Authentication & User Management (`/api/auth`)**:
   - `POST /api/auth/register` (Registration with optional profile image)
   - `POST /api/auth/login` (JWT token authentication)
   - `GET /api/auth/verify-email` (Email token verification page)
   - `POST /api/auth/resend-verification` (Resend verification email)
   - `GET /api/auth/profile` (Fetch profile details & plan)
   - `POST /api/auth/upload-image` (Upload avatar to Cloudinary)

2. **Resume CRUD & Image Upload (`/api/resumes`)**:
   - `POST /api/resumes` (Create new resume by title)
   - `GET /api/resumes` (List all user resumes)
   - `GET /api/resumes/{id}` (Get full resume details)
   - `PUT /api/resumes/{id}` (Update resume sections & template styling)
   - `PUT /api/resumes/{id}/upload-images` (Upload resume thumbnail and profile pictures)
   - `DELETE /api/resumes/{id}` (Delete resume)

3. **Templates System (`/api/templates`)**:
   - `GET /api/templates` (Fetch template permissions, restrictions & active subscription plan)
   - **Template 01**: Modern Classic (Free)
   - **Template 02**: Sidebar Pro (Premium)
   - **Template 03**: Executive Minimalist (Premium)
   - Real-time color palette customization

4. **Payments & eSewa Subscription (`/api/payment`)**:
   - `POST /api/payment/create-order` (Initiates eSewa ePay payment form)
   - `POST /api/payment/verify` & `GET /api/payment/verify` (Payment confirmation)
   - `GET /api/payment/failure` (Failed transaction handler)
   - `GET /api/payment/history` (Payment & transaction records)
   - `GET /api/payment/order/{orderId}` (Order detail inquiry)

5. **PDF & Print Export**:
   - Vector-quality PDF download via `html2pdf.js`
   - One-click native Print dialog with clean CSS print media rules

## Getting Started

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Start the development server
```bash
npm run dev
```

The app will be accessible at: `http://localhost:3000` (or `http://localhost:5173`) with automated proxy to Spring Boot backend at `http://localhost:8080`.
