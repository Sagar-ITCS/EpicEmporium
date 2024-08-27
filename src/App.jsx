<<<<<<< HEAD
import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        Niko Bellic
      </div>
    </>
  )
}

export default App
=======
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
>>>>>>> beta
