import js from "@eslint/js";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        plugins: {
            turbo: turboPlugin,
            "@stylistic/ts": stylisticTs,
        },
        rules: {
            "turbo/no-undeclared-env-vars": "off",
            "@stylistic/ts/semi": ["error", "always"],
            "@typescript-eslint/consistent-type-imports": "error",
        },
    },
    {
        plugins: {
            onlyWarn,
        },
    },
    {
        ignores: ["dist/**"],
    },
];
