const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#000',
      '@layout-body-background': '#fff',
      '@font-family': 'Inter, sans-serif',
      '@border-radius-base': '8px',
    },
  })
);
