const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { join } = require('path')
import * as webpack from 'webpack'

module.exports = {
  webpack: (config, { dev }) => {
    const prod = !dev;
    // Remove minifed react aliases for material-ui so production builds work
    if (config.resolve.alias) {
      delete config.resolve.alias.react
      delete config.resolve.alias['react-dom']
    }

    // config.plugins = config.plugins.filter(
    //   (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    // )

    config.node = {
      __filename: true,
      __dirname: true,
    }

    config.plugins.push(
      // new SWPrecacheWebpackPlugin({
      //   verbose: true,
      //   filepath: `${join(__dirname, '/static/service-worker.js')}`,
      //   staticFileGlobsIgnorePatterns: [/\.map$/, /\.DS_Store$/],
      //   staticFileGlobs: [
      //     '/static/**/**.*',// Precache all static files by default
      //     '/pages/**/**.*' // Precache all static files by default
      //   ],
      //   stripPrefix: __dirname, // stripPrefixMulti is also supported
      //   mergeStaticsConfig: true,
      //   runtimeCaching: [{
      //     handler: 'cacheFirst',
      //     urlPattern: '/',
      //   }],
      //   clientsClaim: true
      // })

      new SWPrecacheWebpackPlugin({
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//, /\.map$/, /\.DS_Store$/],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ],
        staticFileGlobs: [
          '/static/**/**.*',// Precache all static files by default
        ],
        stripPrefix: __dirname, // stripPrefixMulti is also supported
        mergeStaticsConfig: true,
      }),
      new webpack.DefinePlugin({
        'process.env.APPLICATION_VERSION': JSON.stringify(require('../package.json').version)
      })
    )

    config.plugins.push(new CopyWebpackPlugin([
      {
        from: `${join(__dirname, '../src/static')}`,
        to: `${join(__dirname, 'static')}`,
        force: true
      },
    ], { copyUnmodified: true }))


    return config
  }
}
