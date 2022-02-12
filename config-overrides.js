const path = require("path");

/**
 * @param  {string} tsconfigPath           - Path to tsconfig
 * @param  {string} webpackConfigBasePath  - Path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
function resolveTsconfigPathsToAlias({
  tsconfigPath = "./tsconfig.json",
  webpackConfigBasePath = __dirname
} = {}) {
  const { paths } = require(tsconfigPath).compilerOptions;

  const aliases = {};

  Object.keys(paths).forEach(item => {
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
        ...resolveTsconfigPathsToAlias({
          tsconfigPath: "./tsconfig.json",
          webpackConfigBasePath: "../"
        })
        // "@lehrlingsquiz/components": path.join(
        //   __dirname,
        //   "src/components/index.ts"
        // )
      }
    }
  };
};
