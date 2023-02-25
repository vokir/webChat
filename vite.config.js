import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    createSvgSpritePlugin({
      include: '**/icons/**/*.svg',
      symbolId: '[name]',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/styles/_mixins.scss";`
      }
    }
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
});
