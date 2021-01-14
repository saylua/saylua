const path = require("path");
const webpack = require("webpack");

const isDevelopment = process.env.NODE_ENV !== "production";

const config = {
  mode: isDevelopment ? "development" : "production",
  devtool: "cheap-source-map",
  context: path.join(__dirname, "src"),
  entry: ["webpack-hot-middleware/client?path=/__webpack_hmr", "./main.ts"],
  output: {
    path: path.join(__dirname, "www"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: "/build",
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "styleTag" } },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = config;
