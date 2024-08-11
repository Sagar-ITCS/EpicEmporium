import { Suspense } from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";

function App() {
  return (
    <div className="">
      {/* <Header /> */}

      <Suspense fallback={<div>Loading...</div>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
export default App;
