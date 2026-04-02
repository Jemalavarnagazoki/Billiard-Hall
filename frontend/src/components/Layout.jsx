import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="page-shell">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
