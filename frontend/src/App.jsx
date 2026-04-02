import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import PricesPage from './pages/PricesPage';
import ReservePage from './pages/ReservePage';
import SignUpPage from './pages/SignUpPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
