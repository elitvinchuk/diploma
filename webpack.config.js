const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: './app',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-stage-0',
            '@babel/preset-react',
            ['@babel/preset-env', {
              targets: {
                browsers: ['last 2 versions']
              }
            }]
          ]
        }
      }
    }]
  },

  resolve: {
    modules: [
      'node_modules/',
      'app/'
    ]
  }
}