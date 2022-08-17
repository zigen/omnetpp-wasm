import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  const isProduction = mode === "production"
  return {
    plugins: [svelte({ hot: false })],
    build: {
      lib: {
        entry: resolve(__dirname, "src/main.js"),
        name: "opp-wasm-client",
        format: "esm",
      },
      emptyOutDir: false,
      outDir: "../dist",
      watch: isProduction ? null : {},
      minify: isProduction,
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        }
      }
    }
  }
})
