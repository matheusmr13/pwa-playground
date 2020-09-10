const CracoLessPlugin = require('craco-less');

const mainColor = '#ea1d2c';
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': mainColor,
              '@layout-header-background': mainColor,
              '@menu-collapsed-width': '64px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
