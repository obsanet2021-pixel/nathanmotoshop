# Nathan Moto Shop 🏍️

A modern e-commerce web application for motorcycle gear and accessories, built with React and Vite.

## Features

- 🛍️ **Product listing** with search, filter, and sort functionality
- 🛒 **Shopping cart** management (add, update quantity, remove items)
- 🌐 **Multi-language support** (English, Amharic, Oromo)
- 📱 **Fully responsive design** — works on desktop, tablet, and mobile
- 💾 **Persistent cart storage** using localStorage
- ⚡ **Fast development** with Vite
- 🏷️ **Low-stock badges** and **out-of-stock overlays** on product cards
- 🔍 **Search products** by name or category
- 📂 **Filter by category** and **sort by price/name**
- 🛠️ **Admin panel** for managing products and orders
- 📦 **Order management** with status tracking (pending, confirmed, shipped, delivered)
- 💬 **WhatsApp integration** for order notifications
- 🎨 **Modern dark-themed UI** with smooth animations

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **React Router DOM** — Client-side routing
- **CSS Modules** — Scoped component styling
- **Context API** — State management (cart, products, orders, language)
- **Lucide React** — Icon library
- **localStorage** — Client-side data persistence

## Project Structure

```
nathanmotoshop/
├── public/
│   ├── favicon.svg
│   └── images/          # Product images
├── src/
│   ├── components/
│   │   ├── shared/      # Navbar, shared UI components
│   │   └── shop/        # ProductCard component
│   ├── context/
│   │   ├── AppContext.jsx   # Global state (cart, products, orders, auth)
│   │   └── translations.js  # Multi-language strings
│   ├── data/
│   │   └── products.js      # Initial product catalog
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── ShopPage.jsx     # Main shop / product listing
│   │   ├── CartPage.jsx     # Shopping cart & checkout
│   │   └── AdminPage.jsx    # Admin dashboard
│   ├── styles/
│   │   └── global.css       # Global styles & CSS variables
│   ├── utils/
│   │   └── helpers.js       # Utility functions
│   ├── App.jsx              # Root component with routing
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** v14 or higher
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nathanmotoshop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder. Preview the build locally with:

```bash
npm run preview
```

## Usage

### Shop Page (`/` or `/shop`)

- Browse all products displayed as cards
- Use the **search bar** to filter products by name
- Select a **category** from the dropdown to filter
- **Sort** products by name (A–Z / Z–A) or price (low–high / high–low)
- Click **"Add to Cart"** on any product to add it to your cart
- Products with low stock show an amber **"Low Stock"** badge
- Out-of-stock products are dimmed with an overlay

### Cart Page (`/cart`)

- View all items in your cart with quantities and prices
- **Update quantities** or **remove items**
- Choose **Home Delivery** or **In-Store Pickup**
- Fill in your name, phone, and address (for delivery)
- Place the order — it will be saved and sent via **WhatsApp** to the shop owner

### Admin Page (`/admin`)

- Login with credentials: `admin` / `moto2024`
- **Add new products** with name, category, price, stock, and image
- **Edit** or **delete** existing products
- **Adjust stock** levels quickly
- **View and manage orders** — update their status (pending → confirmed → shipped → delivered)

### Language Switching

- Use the language toggle in the navbar to switch between **English**, **Amharic (አማርኛ)**, and **Oromo (Afaan Oromoo)**

## Configuration

### WhatsApp Number

To set the shop owner's WhatsApp number for order notifications, edit `src/context/AppContext.jsx`:

```js
const WHATSAPP_NUMBER = '251900000000'; // Replace with your number (country code, no +)
```

### Admin Credentials

The default admin credentials are in `src/context/AppContext.jsx`:

```js
if (username === 'admin' && password === 'moto2024')
```

> **Note:** For production, replace this with a proper authentication system (e.g., API / Cloudflare Workers auth).

## Deployment

This project is ready to deploy on any static hosting platform:

- **Vercel** — Connect your repo, Vite preset works out of the box
- **Netlify** — Include a `_redirects` file for SPA routing (already included)
- **Cloudflare Pages** — Build command: `npm run build`, output dir: `dist`

## License

This project is for educational and demonstration purposes.
