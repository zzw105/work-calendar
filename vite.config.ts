import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vite.dev/config/
export default defineConfig({
  base: "/work-calendar/",
  server: {
    proxy: {
      "/work-calendar/api": {
        target: "http://localhost:8080", // 目标服务器地址
        changeOrigin: true, // 如果目标服务器与前端不同域，设置为 true
        rewrite: (path) =>
          path.replace(/^\/work-calendar\/api/, "/work-calendar"), // 去除 /api，保留 /work-calendar
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
