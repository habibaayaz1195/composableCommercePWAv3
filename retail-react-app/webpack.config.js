const configs = require('@salesforce/pwa-kit-dev/configs/webpack/config')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const isDevMode = process.env.NODE_ENV !== 'production'

configs.forEach(config => {
    // ✅ Add polyfills for Node core modules used by dotenv
    config.resolve = {
        ...(config.resolve || {}),
        fallback: {
            ...(config.resolve?.fallback || {}),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify')
        }
    }

    // ✅ Add SASS/CSS loaders
    config.module.rules.push({
        test: /\.(sa|sc|c)ss$/,
        use: [
            MiniCSSExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: isDevMode,
                    importLoaders: 1
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: isDevMode
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: isDevMode
                }
            }
        ]
    })

    // ✅ Add plugin for extracted CSS
    config.plugins.push(new MiniCSSExtractPlugin({ filename: '[name].css' }))
})

module.exports = configs
