// ESLint flat config (SPEC §21). Минимально и совместимо с Astro + TS.
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist/', '.astro/', 'node_modules/', 'public/', '_scratch/', '.tmp-*', '**/*.d.ts']),
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  {
    // Pages Functions работают в воркер-рантайме (Request/Response/URL — глобальные).
    files: ['functions/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Канонический снипет GA4 (gtag) использует `arguments` — это стандарт Google;
    // не переписываем под rest-параметры (изменило бы поведение dataLayer.push).
    // Правило стилистическое, другого использования arguments в коде нет.
    rules: { 'prefer-rest-params': 'off' },
  },
]);
