const path = require('path');

module.exports = {
  target: 'web', // Changed from 'node' to 'web'
  entry: './node.mjs',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // If you need a library target, choose one appropriate for the web, or you might not need this line at all.
  },
  externals: {
    'mysql2': 'commonjs2 mysql2' // Review if this is needed for the web target
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
