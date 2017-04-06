module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "semi": [2, "never"],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": 0,
        "import/extensions": 0,
    },
    "globals": {
        "document": true
    }
};