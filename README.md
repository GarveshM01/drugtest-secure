# 🛡️ DrugTest Secure — SIH 2026 Prototype

**DrugTest Secure** is a mobile-first digital presumptive drug testing verification portal designed for law enforcement and field inspection officers. It works alongside existing visual colour-change field test kits to digitize, calibrate, and cryptographically log field test records.

---

## 🌟 Key Features

- 📱 **Mobile-First Responsive Interface:** Optimized for field use on smartphones, tablets, and desktops.
- 📷 **Real Camera Capture:** Accesses hardware device cameras via Web API with live visual alignment reticles and fallback file upload support.
- 🎨 **Colour Calibration Reference:** Designed to calibrate visual reagent colour reactions against standard reference colour cards.
- ⚡ **Automated Presumptive Analysis:** Simulates spectral colour extraction, giving *Presumptive Positive*, *Presumptive Negative*, or *Inconclusive* classifications with confidence match scores.
- 🔒 **Tamper-Evident SHA-256 Digest:** Uses the browser Web Crypto API (`crypto.subtle.digest`) to generate a unique cryptographic hash for every captured image.
- 📍 **GPS Geolocation Logging:** Automatically logs officer coordinates (with fallback mock location indicator for prototype testing).
- 📋 **9-Step Structured Test Wizard:** Standardized field procedure workflow preventing missing case metadata.
- 🔍 **Searchable Test History:** Query logged records by Record ID, Case ID, Sample ID, Officer ID, and filter by result or substance category.
- 📊 **Supervisor & Admin Portal:** High-level metrics tracking officer shift activity, system compliance, and audit logs.

---

## 🚀 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Cryptography:** Browser Web Crypto API (Native SHA-256)

---

## 🔑 Demo Credentials

To test the officer portal on `/login`:

- **Officer ID:** `OFF-1023`
- **Unit / Batch ID:** `BPL-CENTRAL-01`
- **Security PIN:** `1234`

*(Tip: Click the **"Auto-fill Demo"** button on the login screen).*

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Setup Instructions

1. Clone or extract the project repository:
   ```bash
   git clone https://github.com/your-username/drugtest-secure.git
   cd drugtest-secure
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📌 Disclaimer

*This application provides a **presumptive field-test result** based on visual colourimetric calibration. It does **NOT** replace official laboratory confirmatory testing (such as GC-MS or LC-MS). Laboratory verification must be conducted for formal legal evidence.*
