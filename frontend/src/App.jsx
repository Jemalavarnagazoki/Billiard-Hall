import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { trackRouteImport } from './lib/routeLoader';

function lazyRoute(importer) {
  return lazy(() => trackRouteImport(importer));
}

const AdminPage = lazyRoute(() => import('./pages/AdminPage'));
const MenuPage = lazyRoute(() => import('./pages/MenuPage'));
const PricesPage = lazyRoute(() => import('./pages/PricesPage'));
const ReservePage = lazyRoute(() => import('./pages/ReservePage'));
const ContactPage = lazyRoute(() => import('./pages/ContactPage'));
const SignInPage = lazyRoute(() => import('./pages/SignInPage'));
const SignUpPage = lazyRoute(() => import('./pages/SignUpPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
