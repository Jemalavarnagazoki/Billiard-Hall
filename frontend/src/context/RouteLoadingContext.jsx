import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { subscribeToRouteLoading } from '../lib/routeLoader';

const RouteLoadingContext = createContext(null);
const ROUTE_INTENT_MS = 550;

export function RouteLoadingProvider({ children }) {
  const [isIntentActive, setIsIntentActive] = useState(false);
  const [pendingImports, setPendingImports] = useState(0);
  const intentTimerRef = useRef(null);

  const startRouteTransition = useCallback(() => {
    window.clearTimeout(intentTimerRef.current);
    setIsIntentActive(true);

    intentTimerRef.current = window.setTimeout(() => {
      setIsIntentActive(false);
    }, ROUTE_INTENT_MS);
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(intentTimerRef.current);
    };
  }, []);

  useEffect(() => {
    return subscribeToRouteLoading((type) => {
      setPendingImports((current) => {
        if (type === 'start') {
          return current + 1;
        }

        return Math.max(0, current - 1);
      });
    });
  }, []);

  useEffect(() => {
    function handlePopState() {
      startRouteTransition();
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [startRouteTransition]);

  const isRouteLoading = isIntentActive || pendingImports > 0;

  return (
    <RouteLoadingContext.Provider
      value={{
        isRouteLoading,
        startRouteTransition
      }}
    >
      {children}
    </RouteLoadingContext.Provider>
  );
}

export function useRouteLoading() {
  const context = useContext(RouteLoadingContext);

  if (!context) {
    throw new Error('useRouteLoading must be used within RouteLoadingProvider.');
  }

  return context;
}
