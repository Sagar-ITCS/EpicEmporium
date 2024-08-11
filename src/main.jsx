import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./product/Product.jsx";
import Navbar from "./components/Navbar.jsx";
import Announcement from "./components/Announcement.jsx";
import Checkout from "./checkout/Checkout.jsx";
import Category from "./category/Category.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import Admin from "./admin/Admin.jsx";
import AddProduct from "./admin/add-product/AddProduct.jsx";
import Orders from "./admin/orders/Orders.jsx";
import NotFound from "./NotFound.jsx";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <Announcement />
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />{" "}
          <Route path="*" element={<NotFound />} />{" "}
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
