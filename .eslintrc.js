module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'react-app',
        'react-app/jest',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto',
            },
        ],
        'react/react-in-jsx-scope': 'off',
        // 'import/prefer-default-export': 'off',
        // 'react/function-component-definition': 'off',
        // 'react/jsx-props-no-spreading': 'off',
        // 'react/no-unescaped-entities': 'off',
        // 'react/button-has-type': 'off',
        // 'react/prop-types': 'off',
    },
};
