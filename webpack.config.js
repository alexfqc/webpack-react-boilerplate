const path = require('path');
const SassLintPlugin = require('sasslint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: './public/js/components/index',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, './public/js/'),
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, './public/js/'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, './public/scss/'),
        loader: extractSass.extract({
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  },
  plugins: [
    new SassLintPlugin({
      configFile: '.sass-lint.yml',
      context: [path.resolve(__dirname, './public/scss/')],
      ignoreFiles: [],
      ignorePlugins: [],
      glob: '**/*.s?(a|c)ss',
      quiet: false,
      failOnWarning: false,
      failOnError: true,
      testing: false,
    }),
    extractSass,
    new HtmlWebpackPlugin({
      title: 'webpack-react-boilerplate',
      template: 'public/index-template.html',
      minify: {
        collapseWhitespace: process.env.NODE_ENV === 'production',
      },
    }),
  ],
};
