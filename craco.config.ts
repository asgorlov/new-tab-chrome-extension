const CracoAntDesignPlugin = require("craco-antd");

export default module.exports = {
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
