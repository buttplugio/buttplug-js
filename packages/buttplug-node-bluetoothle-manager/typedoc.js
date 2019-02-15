module.exports = {
  mode: "file",
  module: "umd",
  target: "ES6",
  exclude: "**/+(test|example|node_modules)/**/*.ts",
  excludeExternals: true,
  excludePrivate: true
};
