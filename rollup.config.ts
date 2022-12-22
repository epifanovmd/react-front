import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
// @ts-ignore
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import styles from "rollup-plugin-styles";

import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "lib/index.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  external: Object.keys(pkg.dependencies),
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    terser(),
    typescript(),
    styles({
      mode: [
        "inject",
        {
          container: "head",
          singleTag: true,
          prepend: true,
          attributes: { id: "global" },
        },
      ],
    }),
  ],
};
