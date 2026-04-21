const listeners = new Set();

function emitRouteLoading(type) {
  listeners.forEach((listener) => listener(type));
}

export function subscribeToRouteLoading(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function trackRouteImport(importer) {
  emitRouteLoading('start');

  return importer().finally(() => {
    emitRouteLoading('stop');
  });
}
