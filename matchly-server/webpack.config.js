var path = require('path');
module.exports = {
  entry: './client/home/router.jsx',
  output: { 
    path: path.join(__dirname, 'build'),
    filename: 'home-bundle.js' 
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        publicPath: ["/assets/", "/build/"],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
