/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js",  "next/core-web-vitals",
    "plugin:eslint-plugin-next-on-pages/recommended"],
  parser: "@typescript-eslint/parser",
  plugins:[ "eslint-plugin-next-on-pages"],
  parserOptions: {
    project: true,
  },
};
