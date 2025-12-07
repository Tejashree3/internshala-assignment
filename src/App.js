import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import ProductList from "./pages/Product/ProductList";
import ProductAdd from "./pages/Product/ProductAdd";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          
          {/* Product Routes */}
          <Route path="products/list" element={<ProductList />} />
          <Route path="products/add" element={< ProductAdd/>} />

          {/* Ingredient Routes */}
          {/* <Route path="ingredients" element={<IngredientList />} />
          <Route path="ingredients/add" element={<AddIngredient />} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
