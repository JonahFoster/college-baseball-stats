const path = require('path');

module.exports = {
  target: 'node', 
  entry: './node.mjs', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js', 
    libraryTarget: 'commonjs2' 
  },
  externals: {
    'mysql2': 'commonjs2 mysql2' 
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env'] 
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.mjs'], 
    fullySpecified: false 
  },
  optimization: {
    minimize: false 
  },
  devtool: 'source-map' 
};
