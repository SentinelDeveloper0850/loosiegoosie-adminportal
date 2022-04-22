import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/home';
import CataloguesPage from './pages/catalogues';
import CategoriesPage from './pages/categories';
import { AnimatePresence } from 'framer-motion';
import ProductsPage from './pages/products';
import LoginPage from './pages/login';
import OrdersPage from './pages/orders';

function App() {
  const location = useLocation();
  return (
    <div className='App'>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/catalogues' element={<CataloguesPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/orders' element={<OrdersPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
