// eslint-disable-next-line react/prop-types
function ProductSummary({ products }) {
  const total = products
    // eslint-disable-next-line react/prop-types
    .reduce((acc, product) => acc + parseFloat(product.price), 0)
    .toFixed(2);

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            <div className="flex justify-between">
              <span>{product.title}</span>
              <span>${product.price}</span>
            </div>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${total}</span>
      </div>
    </div>
  );
}

export default ProductSummary;
