const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader' //ts-loader使うよ
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    open: true,
  },
};
