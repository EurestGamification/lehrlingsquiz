const path = require("path");

/**
 * @param  {string} tsconfigPath           - Path to tsconfig
 * @param  {string} webpackConfigBasePath  - Path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
function resolveTsconfigPathsToAlias({
  tsconfigPath = "./tsconfig.json",
  webpackConfigBasePath = __dirname,
} = {}) {
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach((item) => {
    const key = item.replace("/*", "");
    const value = path.join(
      webpackConfigBasePath,
      paths[item][0].replace("/*", "").replace("*", "")
    );

    aliases[key] = value;
  });

  return aliases;
}

module.exports = function override(config = {}, env) {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        ...resolveTsconfigPathsToAlias(),
        theme: path.join(__dirname, "src/theme/index.scss"),
        "theme:variables": path.join(
          __dirname,
          "src/theme/variables/index.scss"
        ),
        "theme:mixins": path.join(
          __dirname,
          "src/theme/mixins/index.scss"
        ),
        "theme:styles": path.join(
          __dirname,
          "src/theme/styles/index.scss"
        ),
      },
    },
  };
};
