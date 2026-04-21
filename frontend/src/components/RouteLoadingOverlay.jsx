import { useLocale } from '../context/LocaleContext';
import { useRouteLoading } from '../context/RouteLoadingContext';

export default function RouteLoadingOverlay() {
  const { isRouteLoading } = useRouteLoading();
  const { content } = useLocale();

  return (
    <div
      aria-hidden={!isRouteLoading}
      className={`route-loading-overlay${isRouteLoading ? ' is-visible' : ''}`}
    >
      <div aria-live="polite" className="route-loading-card" role="status">
        <div className="loading-eight-ball" />
        <p className="route-loading-label">{content.ui.loading.label}</p>
        <span className="route-loading-message">{content.ui.loading.message}</span>
      </div>
    </div>
  );
}
