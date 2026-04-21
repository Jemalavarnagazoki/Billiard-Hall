import { Link, NavLink, useLocation } from 'react-router-dom';
import { useRouteLoading } from '../context/RouteLoadingContext';

function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function shouldStartTransition(event, target) {
  if (event.defaultPrevented) {
    return false;
  }

  if (event.button !== 0) {
    return false;
  }

  if (target && target !== '_self') {
    return false;
  }

  return !isModifiedEvent(event);
}

function getPathname(to) {
  if (typeof to === 'string') {
    return to.split('?')[0].split('#')[0] || '/';
  }

  return to?.pathname || null;
}

function useTransitionHandler(to, onClick, target) {
  const { pathname } = useLocation();
  const { startRouteTransition } = useRouteLoading();

  return (event) => {
    onClick?.(event);

    if (!shouldStartTransition(event, target)) {
      return;
    }

    const nextPathname = getPathname(to);

    if (nextPathname && nextPathname !== pathname) {
      startRouteTransition();
    }
  };
}

export function RouteLink({ to, onClick, target, ...props }) {
  const handleClick = useTransitionHandler(to, onClick, target);

  return <Link {...props} onClick={handleClick} target={target} to={to} />;
}

export function RouteNavLink({ to, onClick, target, ...props }) {
  const handleClick = useTransitionHandler(to, onClick, target);

  return <NavLink {...props} onClick={handleClick} target={target} to={to} />;
}
