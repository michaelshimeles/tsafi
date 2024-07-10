/* eslint-disable @typescript-eslint/no-var-requires */
const { host } = require('@jsdevtools/host-environment');
const { karmaConfig } = require('@jsdevtools/karma-config');

module.exports = karmaConfig({
  sourceDir: '.',
  fixtures: ['test/__datasets__/*.json'],
  browsers: {
    chrome: true,
    firefox: true,
    safari: host.os.mac,
    edge: false,
    ie: false,
  },
  tests: ['test/*.ts'],
  config: {
    webpack: {
      resolve: {
        extensions: ['.js', '.ts'],
      },
      mode: 'production',
      module: {
        rules: [{ test: /\.ts$/, use: 'ts-loader' }],
      },
    },
  },
});
