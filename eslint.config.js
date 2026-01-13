import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      // 미사용 변수 에러 최적화
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          varsIgnorePattern: "^[A-Z_]", // 대문자 시작(컴포넌트) 또는 _ 시작 무시
          argsIgnorePattern: "^[A-Z_]", // 매개변수도 _ 시작하면 무시
          ignoreRestSiblings: true, // 구조 분해 할당 시 나머지 변수 무시
        },
      ],
      "react-refresh/only-export-components": "off", // 경고를 완전히 끔
    },
  },
]);
