const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts",
    app: "./src/main.ts"
  },
  output: {
    path: path.resolve(__dirname, "./public"), // The path to the output directory - './public'
    publicPath: "/public/",
    filename: "[name].js" // name of the created file
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      //bootloader for ts
      {
        test: /\.ts$/, // determine the type of files
        use: [
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve(__dirname, "tsconfig.json")
            }
          },
          "angular2-template-loader"
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src/app"),
        loader: "raw-loader"
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.resolve(__dirname, "src"), // directory with source files
      {} // route map
    )
  ]
};
