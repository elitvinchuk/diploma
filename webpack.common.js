const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './app'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new CopyWebpackPlugin([{
      from: 'public/firebase-messaging-sw.js'
    }]),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'public/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-stage-0',
              '@babel/preset-react',
              [
                '@babel/preset-env', {
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