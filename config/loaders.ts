import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import flexBugFixes from "postcss-flexbugs-fixes";

import paths from "./paths";

// configurations
const publicPath = paths.publicUrlOrPath;
const shouldUseRelativeAssetPaths = publicPath === "./";
const isProd = process.env.NODE_ENV === "production";

const cssFilename = "css/[name].[hash:8].css";
const importAntDesignOption = {
  libraryName: "antd",
  style: true,
};

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

const flexBugFixesInstance = flexBugFixes();
const autoprefixerInstance = autoprefixer({
  flexbox: "no-2009",
});

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || "10000",
);

// loaders

// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.

// postcss loaders - internal
const postcssLoader = {
  loader: require.resolve("postcss-loader"),
  options: {
    ident: "postcss",
    plugins: () => [flexBugFixesInstance, autoprefixerInstance],
  },
};

// style
const styleLoader = isProd
  ? {
      loader: MiniCssExtractPlugin.loader,
      options: shouldUseRelativeAssetPaths
        ? // Making sure that the publicPath goes back to to build folder.
          { publicPath: Array(cssFilename.split("/").length).join("../") }
        : {},
    }
  : require.resolve("style-loader");

// css
const rawCssLoader = {
  loader: require.resolve("css-loader"),
  options: isProd
    ? {
        importLoaders: 1,
        sourceMap: shouldUseSourceMap,
      }
    : {
        importLoaders: 1,
      },
};
const cssLoader = {
  test: /\.css$/,
  use: [styleLoader, rawCssLoader, postcssLoader],
};

// less
const lessLoader = {
  test: /\.less$/,
  use: [styleLoader, rawCssLoader, postcssLoader],
};

// scss
const rawSassLoader = {
  loader: "sass-loader",
  options: {
    sassOptions: {
      includePaths: [paths.appSrc],
    },
  },
};
const scssLoader = {
  test: /\.scss$/,
  use: [styleLoader, rawCssLoader, postcssLoader, rawSassLoader],
};

// graphql loader
const graphqlLoader = {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: "graphql-tag/loader",
};

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const urlLoader = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  type: "asset",
  parser: {
    dataUrlCondition: {
      maxSize: imageInlineSizeLimit,
    },
  },
};

const fileLoader = {
  loader: require.resolve("file-loader"),
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  options: {
    name: "media/[name].[hash:8].[ext]",
  },
};

// 这部分可以分成function, 如果是
export default {
  cssLoader,
  lessLoader,
  scssLoader,
  graphqlLoader,
  urlLoader,
  fileLoader,
};
