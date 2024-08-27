import ProductGrid from "../components/ProductGrid";
import ProductDetail from "./ProductDetail";

function Product() {
  return (
    <div>
      <ProductDetail />
      <div className="flex flex-col items-center ">
        <h2 className="text-3xl font-bold mb-4 p-2 ">Related Products</h2>
        <ProductGrid />
      </div>
    </div>
  );
}
export default Product;
