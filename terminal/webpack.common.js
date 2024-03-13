const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    child: './src/js/child.js'
  },
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    // Outputs: build/js/main.js and build/js/child.js
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build', 'js'),
  }
}