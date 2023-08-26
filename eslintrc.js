module.exports = {
    // Configuration for JavaScript files
    extends: [
      'airbnb-base',
      'plugin:prettier/recommended',
    ],
    rules: {
      "no-unused-vars": "off", 
      "import/no-unused-modules": "error",
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
    },
    overrides: [
      // Configuration for TypeScript files
      {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],
        extends: [
          'airbnb-typescript',
          'next/core-web-vitals',
          'plugin:prettier/recommended',
        ],
        parserOptions: {
          project: './tsconfig.json',
        },
        rules: {
          'prettier/prettier': [
            'error',
            {
              singleQuote: true,
              endOfLine: 'auto',
            },
          ],
          'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
          'jsx-a11y/anchor-is-valid': 'off', // Next.js use his own internal link system
          'react/require-default-props': 'off', // Allow non-defined react props as undefined
          'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
          'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
          '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
          '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
          'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
          'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
          'unused-imports/no-unused-imports': 'error',
          'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        },
      },
      
    ],
  };
  