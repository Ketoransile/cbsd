module.exports = {
  extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
  env: {
    node: true,
    browser: true,
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
  ],
};
