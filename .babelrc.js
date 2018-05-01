module.exports = {
  plugins: [
    'react-hot-loader/babel'
  ],
  presets: [
    '@babel/env',
    '@babel/react',
    ['@babel/stage-1', { decoratorsLegacy: true }]
  ]
}