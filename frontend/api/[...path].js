let appModulePromise;
let bootstrapPromise;

async function loadAppModule() {
  if (!appModulePromise) {
    appModulePromise = import('../../backend/src/app.js');
  }

  return appModulePromise;
}

module.exports = async function handler(request, response) {
  const appModule = await loadAppModule();

  if (!bootstrapPromise) {
    bootstrapPromise = appModule.bootstrapStore();
  }

  await bootstrapPromise;
  return appModule.default(request, response);
};
