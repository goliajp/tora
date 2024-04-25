module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true
  },
  settings: {
    react: {
      version: 'detect' // Auto-detect the version of React to lint
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
    'prettier' // Ensure this is the last configuration in the extent array.
  ],
  ignorePatterns: ['dist', 'out', '.eslintrc.cjs', '**/wasm/*'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      arrowFunctions: true,
      classes: true,
      modules: true,
      defaultParams: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'jsx-a11y', 'react', 'import'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    indent: 0, // No indentation requirement
    'arrow-body-style': 0, // No preference in using block or implicit return in arrow functions
    'no-plusplus': 0, // Allow the use of ++ and --
    'no-confusing-arrow': 0, // Allow arrow functions to return assignments
    'no-console': 0, // Allow the use of console
    'no-const-assign': 2, // Prevent re-assigning const variables
    'no-param-reassign': 0, // Allow reassigning function parameters
    'no-shadow': 0, // Allow variable shadowing
    'no-return-assign': 0, // Allow return assignment
    'no-prototype-builtins': 0, // Allow calling some Object.prototype methods directly
    'no-restricted-syntax': 0, // No restrictions on syntax
    'no-use-before-define': 0, // Allow usage of variables before they are defined
    'no-unused-expressions': 0, // Allow unused expressions
    'object-curly-newline': 0, // No styling requirements for object literal newline
    'import/no-unresolved': 0, // Turn off enforcement of imports resolution
    'import/prefer-default-export': 0, // No preference over default or named exports
    'import/no-extraneous-dependencies': 0, // Allow import of dependencies not in package.json
    'import/extensions': 0, // No enforcing of file extensions for imports
    'implicit-arrow-linebreak': 0, // No requirements for line breaks inside arrow functions
    'function-paren-newline': 0, // No newline requirements for function parentheses
    'jsx-quotes': [0, 'prefer-double'], // No enforcement of JSX quotes style
    'comma-dangle': 0, // No enforcement on trailing commas
    'consistent-return': 0, // Allow different return types from functions
    'jsx-a11y/click-events-have-key-events': 0, // Allow click elements without a key event
    'jsx-a11y/no-static-element-interactions': 0, // Allow interactions on static elements
    'jsx-a11y/anchor-is-valid': 0, // Do not enforce anchors to have href
    'max-classes-per-file': 0, // No restriction on the number of classes per file
    'operator-linebreak': 0, // No enforcement on operator linebreak style
    'nonblock-statement-body-position': 0, // Allow block-like bodies in single-line statements
    'generator-star-spacing': 0, // No spacing requirement around * in generator functions
    'max-len': 0, // No maximum length enforcement on a line
    'class-methods-use-this': 0, // Allow class methods not using 'this'
    camelcase: 0, // No enforcement of camelcase style
    semi: [2, 'never'], // Disallow the use of semicolons.

    // React
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Allow constant exports
    'react/no-unstable-nested-components': 0, // Allow unstable nested components
    'react/function-component-definition': 0, // Allow function components to be defined in any form
    'react/no-array-index-key': 0, // Allow usage of array index as a key
    'react/react-in-jsx-scope': 0, // No requirement for React to be in scope
    'react/jsx-curly-brace-presence': 2, // Enforce curly braces around string literals in JSX attributes
    'react/jsx-filename-extension': 0, // No requirement for JSX file extensions
    'react/jsx-one-expression-per-line': 0, // Allow multiple JSX expressions per line
    'react/jsx-props-no-spreading': 0, // Allow spreading of props
    'react/prop-types': 0, // Do not enforce prop types validation
    'react/jsx-curly-newline': 0, // No enforcement of linebreaks in JSX attributes

    // Tailwind CSS
    'tailwindcss/migration-from-tailwind-2': 0, // No enforcement of tailwindcss v2 migration
    'tailwindcss/classnames-order': 0, // No enforcement of tailwindcss classnames order
    'tailwindcss/no-contradicting-classname': 0, // No enforcement of tailwindcss contradicting classnames
    'tailwindcss/enforces-negative-arbitrary-values': 0, // No enforcement of tailwindcss negative arbitrary values

    // TypeScript
    '@typescript-eslint/no-explicit-any': 0 // Allow usage of any type
  }
}
