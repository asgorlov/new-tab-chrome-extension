import type { Configuration as WebpackConfig } from "webpack";

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

export default module.exports = {
  webpack: {
    configure: (webpackConfig: WebpackConfig, params: any) => {
      if (params.env === "development") {
        // Removing dev server startup freeze
        webpackConfig.output = {
          ...webpackConfig.output,
          filename: "static/js/[name].bundle.js"
        };
      } else {
        // Analyzing the webpack output files (main.js)
        const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE
          ? "server"
          : "json";
        webpackConfig.plugins?.push(new BundleAnalyzerPlugin({ analyzerMode }));
      }

      // Split bundle into vendor parts
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: (module: any) => {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];

                return `${packageName.replace("@", "")}`;
              }
            }
          },
          filename: "vendor.[name].js"
        }
      };

      // Adding the ability to insert "await" into a top-level script
      webpackConfig.experiments = {
        ...webpackConfig.experiments,
        topLevelAwait: true
      };

      // Removing the create-react-app imports restriction outside of src directory
      const resolvePlugins = webpackConfig.resolve?.plugins;
      if (resolvePlugins) {
        const scopePluginIndex = resolvePlugins.findIndex(
          ({ constructor }: any) =>
            constructor && constructor.name === "ModuleScopePlugin"
        );
        resolvePlugins.splice(scopePluginIndex, 1);
      }

      return webpackConfig;
    }
  }
};
