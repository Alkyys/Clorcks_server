const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    publicPath: "/assets/"
  },
  target: 'node', 
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
}