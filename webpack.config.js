// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const fs = require('fs');
const ZipPlugin = require('zip-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

function getLambdaFunctionNames() {
  const directoryPath = path.join(__dirname, 'src', 'lambdas');
  return fs.readdirSync(directoryPath);
}

function getConfig(target) {
  return {
    entry: `./src/lambdas/${target}/index.ts`,
    target: 'node',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist', target),
      libraryTarget: 'commonjs',
      filename: `index.js`,
    },
    plugins: [
      new ZipPlugin({
        filename: `${target}.zip`,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: 'ts-loader',
          exclude: ['/node_modules/'],
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
    },
  };
}

module.exports = () => {
  return getLambdaFunctionNames().map(target => {
    const config = getConfig(target);
    if (isProduction) {
      config.mode = 'production';
    } else {
      config.mode = 'development';
    }
    return config;
  });
};
