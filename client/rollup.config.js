import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'
import css from "rollup-plugin-import-css";


export default {
  input: {
   "main": 'src/main.js',
  },
  output: {
    dir: "public/build",
    format: 'esm',
  },
  plugins: [
    svelte({
      include: 'src/**/*.svelte',
      // Optionally, preprocess components with svelte.preprocess:
      // https://svelte.dev/docs#svelte_preprocess
      emitCss: false,
      onwarn: (warning, handler) => {
        if (warning.code === 'a11y-distracting-elements') return;
        handler(warning);
      },
      compilerOptions: {
        generate: 'dom',
        customElement: false
      }
    }),
    resolve({ browser: true }),
    serve({
      contentBase: ['public'],
      host: 'localhost',
      port: 8000,
      headers: {
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
    }),
    css(),
  ]
}
