module.exports = {
    parserOptions: {
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'standard-with-typescript',
        'plugin:react/recommended',
    ],
    overrides: [
        {
            files: ['.eslintrc.cjs'],
            parser: 'espree',
            parserOptions: {
                sourceType: 'module',
            },
        },
        {
            env: {
                node: true,
            },
            files: [
                '.eslintrc.{js,cjs}',
            ],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    plugins: [
        'react',
    ],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off'
    },
};