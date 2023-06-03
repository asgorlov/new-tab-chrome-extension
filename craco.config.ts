const CracoAntDesignPlugin = require("craco-antd");

export default module.exports = {
  webpack: {
    configure: (webpackConfig: any) => {
      webpackConfig.experiments = {
        ...webpackConfig.experiments,
        topLevelAwait: true
      };

      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }: any) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      return webpackConfig;
    }
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            relativeUrls: false
          }
        }
      }
    }
  ]
};
