const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const entryPath = './src/index.jsx'
const outputPath = './public'
const PUBLIC_PATH = '/'

const config = {
  mode: 'development',

  entry: {
    main: path.resolve(__dirname, entryPath),

  },

  output: {
    path: path.resolve(__dirname, outputPath),
    publicPath: PUBLIC_PATH,
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[name].bundle.[hash].js',
  },

  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'highlight-loader' },
          { loader: 'markdown-loader' },
        ],
      },
      {
        test: /\.(woff|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'raw-loader' }],
      },
      {
        test: /\.(ico|jpe?g|png)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]',
        },
      },
    ],
  },

  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new MiniCssExtractPlugin({
      fileName: 'style.css',
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}

module.exports = config
