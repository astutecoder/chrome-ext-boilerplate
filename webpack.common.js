const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const generateHtmlPlugins = (chunks) => {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        title: chunk.title,
        filename: `${chunk.name}.html`,
        chunks: [chunk.name],
        inject: 'body',
        template: path.resolve(__dirname, './src/tpl.html'),
      })
  );
};

module.exports = {
  entry: {
    popup: path.resolve(__dirname, './src/popup/popup.tsx'),
    background: path.resolve(__dirname, './src/scripts/background.ts'),
    contentScript: path.resolve(__dirname, './src/scripts/contentScript.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: 'ts-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/static'),
          to: path.resolve(__dirname, './dist'),
        },
      ],
    }),

    ...generateHtmlPlugins([{ title: 'Popup', name: 'popup' }]),
  ],
};
