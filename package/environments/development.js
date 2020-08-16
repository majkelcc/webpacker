const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./base')
const devServer = require('../dev_server')
const { outputPath: contentBase, publicPath } = require('../config')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map'
}

if (
  process.env.WEBPACK_DEV_SERVER &&
  process.env.WEBPACK_DEV_SERVER !== 'undefined'
) {
  if (devServer.hmr) {
    merge(devConfig, {
      output: {
        filename: '[name]-[hash].js'
      },
      plugins: [new webpack.HotModuleReplacementPlugin()]
    })
  }

  merge(devConfig, {
    devServer: {
      clientLogLevel: 'none',
      compress: devServer.compress,
      quiet: devServer.quiet,
      disableHostCheck: devServer.disable_host_check,
      host: devServer.host,
      port: devServer.port,
      https: devServer.https,
      hot: devServer.hmr,
      contentBase,
      inline: devServer.inline,
      useLocalIp: devServer.use_local_ip,
      public: devServer.public,
      publicPath,
      historyApiFallback: {
        disableDotRule: true
      },
      headers: devServer.headers,
      overlay: devServer.overlay,
      stats: {
        entrypoints: false,
        errorDetails: true,
        modules: false,
        moduleTrace: false
      },
      watchOptions: devServer.watch_options
    }
  })
}

module.exports = merge(baseConfig, devConfig)
