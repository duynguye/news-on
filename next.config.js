const path = require('path')
const withSass = require('@zeit/next-sass')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')

module.exports = withPlugins([
  withCSS,
  [
    withSass, {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]__[hash:base64:5]',
        url: false
      },
    }
  ], 
  withFonts
], {
  webpack(config, { dev, isServer, defaultLoaders }) {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['layouts'] = path.join(__dirname, 'layouts')
    config.resolve.alias['config'] = path.join(__dirname, 'config')

    config.module.rules.push({
      test: /\+(js|jsx)$/,
      loader: defaultLoaders.babel,
      exclude: /node_modules[\/\\](?!(swiper|dom7)[\/\\])/
    })

    // Add polyfill
    const originalEntry = config.entry

    config.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js']) {
        console.log('Including polyfills.js')
        
        entries['main.js'].unshift('./client/polyfills.js')
      }

      return entries
    }
    
    return config
  }
})
