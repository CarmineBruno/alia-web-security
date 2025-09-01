const path = require('path');
const config = {
  entry: {
    vendor: ['@babel/polyfill', 'react'], // Third party libraries

    // Every pages entry point should be mentioned here
    index: ['./src/components/entry/index.jsx'],
    escaping: ['./src/components/entry/escaping.jsx'],
    dangerousInnerHtml: ['./src/components/entry/dangerousInnerHtml.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'src', 'public'), //destination for bundled output is under ./src/public
    filename: '[name].js', // names of the bundled file will be name of the entry files (mentioned above)
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader', // asks bundler to use babel loader to transpile es2015 code
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        exclude: [/node_modules/, /public/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*'],
  }, // If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
};

module.exports = config;
