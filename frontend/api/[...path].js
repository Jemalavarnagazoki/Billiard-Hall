import app, { bootstrapStore } from '../../backend/src/app.js';

const ready = bootstrapStore();

export default async function handler(request, response) {
  await ready;
  return app(request, response);
}
