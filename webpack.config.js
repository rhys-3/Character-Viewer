const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// 扫描 src 目录下的所有子目录
const srcDir = path.resolve(__dirname, 'src');
const entries = {};
const htmlPlugins = [];

fs.readdirSync(srcDir).forEach(dir => {
  const dirPath = path.join(srcDir, dir);
  if (fs.statSync(dirPath).isDirectory()) {
    const indexTs = path.join(dirPath, 'index.ts');
    const indexHtml = path.join(dirPath, 'index.html');
    
    if (fs.existsSync(indexTs) && fs.existsSync(indexHtml)) {
      entries[dir] = indexTs;
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          template: indexHtml,
          filename: `${dir}.html`,
          chunks: [dir],
          inject: 'head',
          scriptLoading: 'blocking',
        })
      );
    }
  }
});

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname),
    filename: '[name].bundle.js',
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: htmlPlugins,
  mode: 'production',
};
