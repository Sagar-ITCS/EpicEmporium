import ProductCard from "./ProductCard";

// const products = [
//   {
//     id: 1,
//     image: "https://via.placeholder.com/400",
//     title: "Product 1",
//     price: "29.99",
//     description: "This is a short description of product 1.",
//     slug: "product-1",
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/400",
//     title: "Product 2",
//     price: "39.99",
//     description: "This is a short description of product 2.",
//     slug: "product-2",
//   },
//   {
//     id: 3,
//     image: "https://via.placeholder.com/400x400",
//     title: "Product 3",
//     price: "49.99",
//     description: "This is a short description of product 3.",
//     slug: "product-3",
//   },
//   {
//     id: 4,
//     image: "https://via.placeholder.com/400",
//     title: "Product 4",
//     price: "59.99",
//     description: "This is a short description of product 4.",
//     slug: "product-4",
//   },
// ];
// fetch all products from the database
let products = await fetch("http://localhost:3000/api/get-products").then(
  (res) => {
    return res.json();
  }
);

function ProductGrid() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, i) => (
          <ProductCard
            key={i}
            image={product.images[0]}
            title={product.name}
            price={product.price}
            description={product.description}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
