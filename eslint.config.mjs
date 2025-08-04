import js from '@eslint/js';
import functional from 'eslint-plugin-functional';

export default [
  js.configs.recommended,
  {
    ignores: ['_site/**', 'node_modules/**', 'lib/**'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      functional
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        fetch: 'readonly',
        L: 'readonly', // Leaflet global
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'writable',
        module: 'writable',
        require: 'readonly',
        global: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly'
      }
    },
    rules: {
      // Modern JS best practices
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'object-shorthand': 'error',
      'no-unused-expressions': 'error',
      
      // Functional programming preferences
      'functional/prefer-readonly-type': 'off', // Too strict for this project
      'functional/no-let': 'warn',
      'functional/prefer-tacit': 'off', // Can hurt readability
      'functional/no-loop-statements': 'warn',
      'functional/no-conditional-statements': 'off', // Too restrictive
      // 'functional/functional-parameters': 'error', // TODO: configure properly
      
      // Code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-implicit-coercion': 'error',
      'no-nested-ternary': 'warn',
      
      // ES Module specific
      'import/no-commonjs': 'off', // We still have some CommonJS files
      'no-mixed-operators': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'comma-dangle': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      
      // Accessibility awareness
      'no-alert': 'error'
    }
  },
  {
    // Special rules for test files
    files: ['test/**/*.js', '**/*.test.js', '**/*.spec.js'],
    rules: {
      'functional/no-let': 'off',
      'functional/no-loop-statements': 'off',
      'no-console': 'off'
    }
  },
  {
    // CommonJS files (Eleventy config, etc.)
    files: ['.eleventy.js', 'vitest.config.js', 'vite.config.js'],
    languageOptions: {
      sourceType: 'module'
    }
  }
];