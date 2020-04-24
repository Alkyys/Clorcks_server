import app from './app.js';
import webpack from 'webpack';

// const port = process.env.NODE_ENV === "production" ?
//   process.env.PORT || 80 :
//   8000;
  const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Clocks listening on port ${port}! 🚀`));
