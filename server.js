import app from './app.js';

const port = process.env.NODE_ENV === "production" ?
  process.env.PORT || 80 :
  8000;

app.listen(port, () =>
  console.log(`Clocks listening on port ${port}! 🚀`)
);