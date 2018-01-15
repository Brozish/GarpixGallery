const path = require('path');

module.exports = {
  devtool: 'source-map',

  entry: {
    app: './frontend/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 9000,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
	       test: /\.js$/,
	       include: [
	          path.resolve(__dirname, 'frontend')
         ],
         loader: 'babel-loader',
         options: {
           presets: ['env', 'react', 'stage-0']
         }
      },
      {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
      }
    ]
  }
}