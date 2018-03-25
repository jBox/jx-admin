"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NpmInstallPlugin = require("npm-install-webpack-plugin");
const Path = require("path");
const WebpackChunkHash = require("webpack-chunk-hash");
const ManifestPlugin = require("webpack-manifest-plugin");

const config = require("./package").config;

module.exports = {
  entry: { main: Path.resolve("src/index.js") },

  devtool: "source-map",

  output: {
    filename: "[name].[chunkhash].js",
    path: Path.resolve("static/dist"),
  },

  externals: {
    jquery: "jQuery"
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: config.css,
              },
            },
            "postcss-loader",
          ],
        }),
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new ExtractTextPlugin("[name].[contenthash].css", {
      allChunks: true,
    }),

    // vendor
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: (module) => {
        return module.context && module.context.indexOf("node_modules") !== -1;
      }
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),

    new NpmInstallPlugin({
      cacheMin: 999999,
      saveDev: true,
      saveExact: true,
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),

    new webpack.HashedModuleIdsPlugin(),

    new WebpackChunkHash(),

    new ManifestPlugin()
  ]
};
