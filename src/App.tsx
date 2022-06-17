import './App.scss';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/home';
import CataloguesPage from './pages/catalogues';
import CategoriesPage from './pages/categories';
import { AnimatePresence } from 'framer-motion';
import ProductsPage from './pages/products';
import LoginPage from './pages/login';
import OrdersPage from './pages/orders';
import QuotationsPage from './pages/quotations';
import InvoicesPage from './pages/invoices';
import CreateQuotationPage from './pages/create-quotation';
import ClientsPage from './pages/clients';
import SettingsPage from './pages/settings';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from './app-constants';
import { hydrateAuth } from './redux/features/auth/auth.slice';
import { hydrateUsers } from './redux/features/user-manager/user-manager-slice';
import { hydratePreferences } from './redux/features/preferences/preferences.slice';
import CreateInvoicePage from './pages/create-invoice';

const ProtectedRoute = ({ children, isAllowed, redirectPath = '/login' }: any) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, signInRequired, isAdmin } = useAppSelector((state) => state.auth);

  const getPersistedState = async () => {
    try {
      const persistedState = await localStorage.getItem(LOCAL_STORAGE_KEY);
      if (persistedState) return JSON.parse(persistedState);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const checkPersistedState = async () => {
      const persistedState: any = await getPersistedState();

      if (persistedState) {
        dispatch(hydrateAuth(persistedState.auth));
        dispatch(hydrateUsers(persistedState.users));
        dispatch(hydratePreferences(persistedState.preferences));
      }
    };

    checkPersistedState();
  }, [dispatch]);

  const isOnline = () => !!user && !signInRequired;

  const isAdminOnline = () => !!user && isAdmin && !signInRequired;

  return (
    <div className='App'>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route element={<ProtectedRoute isAllowed={isOnline()} />}></Route>
          <Route path='/' element={<HomePage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/catalogues' element={<CataloguesPage />} />
          <Route path='/categories' element={<CategoriesPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/orders' element={<OrdersPage />} />
          <Route path='/clients' element={<ClientsPage />} />
          <Route path='/quotations' element={<QuotationsPage />} />
          <Route path='/quotations/create' element={<CreateQuotationPage />} />
          <Route path='/invoices' element={<InvoicesPage />} />
          <Route path='/invoices/create' element={<CreateInvoicePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
