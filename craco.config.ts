const CracoAntDesignPlugin = require("craco-antd");

export default module.exports = {
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true
      }
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
