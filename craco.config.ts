import type { Configuration as WebpackConfig } from "webpack";
import type { EntryObject } from "webpack";

const path = require("path");

export default module.exports = {
  webpack: {
    configure: (webpackConfig: WebpackConfig, params: any) => {
      // Removing dev server startup freeze
      if (params.env === "development") {
        webpackConfig.output = {
          ...webpackConfig.output,
          filename: "static/js/[name].bundle.js"
        };
      }

      // Adding new scripts to index.html
      webpackConfig.entry = {
        init: path.resolve(__dirname, "./src/init/init.ts"),
        main: webpackConfig.entry
      } as EntryObject;

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
