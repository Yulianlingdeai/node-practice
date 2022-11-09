module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        // "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    overrides: [],
    // parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest"
    },
    // plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": "off"
    }
};
