const webpack = require('webpack');

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join } = require('path');

module.exports = {
  webpack: (config, { dev }) => {
    const prod = !dev;
    // Remove minifed react aliases for material-ui so production builds work
    if (config.resolve.alias) {
      delete config.resolve.alias.react;
      delete config.resolve.alias['react-dom'];
    }

    config.node = {
      __filename: true,
      __dirname: true
    }

    config.plugins.push(
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

    return config;
  }
};
