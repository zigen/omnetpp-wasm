import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'

export default {
  input: 'src/main.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
  },
  plugins: [
    svelte({
      include: 'src/**/*.svelte',
      // Optionally, preprocess components with svelte.preprocess:
      // https://svelte.dev/docs#svelte_preprocess
      preprocess: {
        style: ({ content }) => {
          return transformStyles(content);
        }
      },
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
  ]
}
