const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const viewer = env && env.viewer ? env.viewer : 'xiaochui';
  const viewerPath = viewer === 'xiaochui' ? 'xiaochui-viewer' : 'diaodiao-viewer';
  const viewerTitle = viewer === 'xiaochui' ? '小初的角色查看器' : '貂貂的角色查看器';

  return {
    entry: path.resolve(__dirname, `src/${viewerPath}/script.js`),
    output: {
      path: path.resolve(__dirname, 'dist', viewer),
      filename: 'bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, `src/${viewerPath}/index.html`),
        title: viewerTitle,
        inject: 'body',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, `src/${viewerPath}/style.css`),
            to: 'style.css',
          },
        ],
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist', viewer),
      },
      compress: true,
      port: 8080,
      open: true,
      hot: true,
    },
    resolve: {
      extensions: ['.js', '.json'],
    },
  };
};
