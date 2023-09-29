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
  }
};
