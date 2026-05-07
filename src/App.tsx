import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "./ui/pages/HomePage";
import { ProductPage } from "./ui/pages/ProductPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
