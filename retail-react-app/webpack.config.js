// const config = require('@salesforce/pwa-kit-dev/configs/webpack/config')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// config[0].module.rules.push({
//     test: /\.(sa|sc|c)ss$/,
//     use: [MiniCssExtractPlugin.loader, 'css-loader']
// })
// config[0].plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))
// config[1].module.rules.push({
//     test: /\.(sa|sc|c)ss$/,
//     use: [MiniCssExtractPlugin.loader, 'css-loader']
// })
// config[1].plugins.push(new MiniCssExtractPlugin({ filename: '[name].css' }))

// module.exports = config

const configs = require('@salesforce/pwa-kit-dev/configs/webpack/config')

const MiniCSSExtractPlugin = require('mini-css-extract-plugin') // use the plugins you need for your sass modules, just this one was fine for what my team needed
const isDevMode = process.env.NODE_ENV !== 'production'
configs.forEach(config => {
    config.module.rules.push({
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCSSExtractPlugin.loader,
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
        }]
    })
    config.plugins.push(new MiniCSSExtractPlugin({ filename: '[name].css' }))
})

module.exports = configs