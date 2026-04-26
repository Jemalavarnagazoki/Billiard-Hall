import app, { bootstrapStore } from './app.js';

const port = process.env.PORT || 4000;

bootstrapStore().then(() => {
  app.listen(port, () => {
    console.log(`Billiard Hall backend running on http://localhost:${port}`);
  });
});
