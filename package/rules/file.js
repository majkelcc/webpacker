const { join, normalize } = require('path')
const { source_path: sourcePath } = require('../config')

module.exports = {
  test: [
    /\.bmp$/,
    /\.gif$/,
    /\.jpe?g$/,
    /\.png$/,
    /\.tiff$/,
    /\.ico$/,
    /\.eot$/,
    /\.otf$/,
    /\.ttf$/,
    /\.woff$/,
    /\.woff2$/
  ],
  exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name(file) {
          if (file.includes(normalize(sourcePath))) {
            return 'media/[path][name]-[hash].[ext]'
          }
          return 'media/[folder]/[name]-[hash:8].[ext]'
        },
        esModule: false,
        context: join(sourcePath)
      }
    }
  ]
}
