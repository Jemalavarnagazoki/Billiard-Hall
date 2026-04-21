import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useRouteLoading } from '../context/RouteLoadingContext';
import Footer from './Footer';
import Navbar from './Navbar';
import RouteLoadingOverlay from './RouteLoadingOverlay';

export default function Layout() {
  const { isRouteLoading } = useRouteLoading();

  return (
    <div aria-busy={isRouteLoading} className={`page-shell${isRouteLoading ? ' is-route-loading' : ''}`}>
      <div className={`app-stage${isRouteLoading ? ' is-loading' : ''}`}>
        <Navbar />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <Footer />
      </div>
      <RouteLoadingOverlay />
    </div>
  );
}
