const path = require('path')
const withSass = require('@zeit/next-sass')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [
    withSass, {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]__[hash:base64:5]'
      },
    }
  ], 
  withFonts
], {
  webpack(config, options) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['layouts'] = path.join(__dirname, 'layouts')
    config.resolve.alias['config'] = path.join(__dirname, 'config')
    return config
  }
})

// module.exports = withSass({
//   cssModules: true,
//   cssLoaderOptions: {
//     importLoaders: 1,
//     localIdentName: '[local]__[hash:base64:5]'
//   },

//   webpack(config, options) {
//     config.resolve.alias['components'] = path.join(__dirname, 'components')
//     config.resolve.alias['layouts'] = path.join(__dirname, 'layouts')
//     config.resolve.alias['config'] = path.join(__dirname, 'config')
//     return config
//   }
// })