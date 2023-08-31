import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
// const path = require('path')
import { resolve } from 'path';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   // resolve: {
//   //   alias: {
//   //     src: "src/",
//   //   },
//   // },


//   resolve: {
//     alias: {
//       '~': path.resolve(__dirname, 'src'),
//     },
//   },
// })


export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': resolve(__dirname, './src')
  //   },
  // },
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
})
