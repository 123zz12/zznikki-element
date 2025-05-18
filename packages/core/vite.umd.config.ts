import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path";

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'dist/umd',
        lib: {
            entry: resolve(__dirname, "./index.ts"),
            name: "ZznikkiElement",
            fileName: "index",
            formats: ["umd"]
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
                assetFileNames: (assetInfo) => {
                    // assetInfo.names 是一个字符串数组
                    if (assetInfo.names?.includes("style.css")) {
                        return "index.css";
                    }
                    // 回退用文件名里的第一个（一般就一个）
                    return assetInfo.names?.[0] ?? "[name].[ext]";
                }

            }
        }

    }
})
