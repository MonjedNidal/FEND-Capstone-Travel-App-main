import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/client/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    mode: argv.mode,
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist')
      },
      port: 8080,
      open: true,
      hot: true,
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:8081',
          changeOrigin: true
        }
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './src/client/views/index.html',
        filename: 'index.html'
      }),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
      }),
      isProduction && new GenerateSW()
    ].filter(Boolean),
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    }
  };
};
