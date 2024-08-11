import React from "react";
import ProductSummary from "./ProductSummary";
import CheckoutForm from "./CheckoutForm";

const products = [
  {
    id: 1,
    image: "https://via.placeholder.com/400",
    title: "Product 1",
    price: "29.99",
    description: "This is a short description of product 1.",
    slug: "product-1",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400",
    title: "Product 2",
    price: "39.99",
    description: "This is a short description of product 2.",
    slug: "product-2",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400",
    title: "Product 3",
    price: "49.99",
    description: "This is a short description of product 3.",
    slug: "product-3",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400",
    title: "Product 4",
    price: "59.99",
    description: "This is a short description of product 4.",
    slug: "product-4",
  },
];

function Checkout() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProductSummary products={products} />
        <CheckoutForm />
      </div>
    </div>
  );
}

export default Checkout;
