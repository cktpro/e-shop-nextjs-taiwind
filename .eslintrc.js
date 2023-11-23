module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:import/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Side effect imports.
              ["^\\u0000"],
              // Internal components, packages.
              // eslint-disable-next-line no-useless-escape
              ["^(@/components)(/.*|$)"],
              ["^(@)(/.*|$)"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "simple-import-sort"],
  rules: {
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "no-underscore-dangle": 0,
    "import/no-extraneous-dependencies": 0,
    "default-param-last": ["error"],
    "import/prefer-default-export": 0,
    // endOfLine: "auto",
  },
};
