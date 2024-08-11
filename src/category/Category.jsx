import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    image: "https://via.placeholder.com/400",
    title: "Product 1",
    price: "29.99",
    description: "This is a short description of product 1.",
    slug: "product-1",
    category: "electronics",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400",
    title: "Product 2",
    price: "39.99",
    description: "This is a short description of product 2.",
    slug: "product-2",
    category: "electronics",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400x400",
    title: "Product 3",
    price: "49.99",
    description: "This is a short description of product 3.",
    category: "clothing",
    slug: "product-3",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400",
    title: "Product 4",
    price: "59.99",
    description: "This is a short description of product 4.",
    slug: "product-4",
    category: "electronics",
  },
];

function CategoryPage() {
  const { categoryName } = useParams();
  const filteredProducts = products.filter((p) => p.category === categoryName);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Category: {categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              slug={product.slug}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
