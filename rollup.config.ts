import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
// @ts-ignore
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import styles from "rollup-plugin-styles";

const config = defineConfig({
  input: "src/index.ts",
  output: [
    {
      dir: "./lib/cjs",
      format: "cjs",
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
      assetFileNames: "[name][extname]",
    },
    {
      dir: "./lib/esm",
      format: "es",
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: true,
      assetFileNames: "[name][extname]",
    },
  ],
  external: /node_modules/,
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    terser(),
    typescript({ declaration: false, declarationDir: undefined }),
    styles({
      mode: ["extract", "index.css"],
    }),
  ],
});

export default config;
