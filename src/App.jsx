import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<div>Cities</div>} />
          <Route path='cities' element={<div>Cities</div>} />
          <Route path='countries' element={<div>Countries</div>} />
          <Route path='form' element={<div>Form</div>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
