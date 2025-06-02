import { defineConfig } from "vite"
import { hooksPlugin as hooks } from "@zznikki-element/vite-plugins"
import { readFile } from "fs";
import { compression } from 'vite-plugin-compression2'
import { resolve } from "path";
import { delay, defer } from "lodash-es";

import shell from 'shelljs'
import terser from "@rollup/plugin-terser"
import vue from "@vitejs/plugin-vue"

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

const TRY_MOVE_STYLES_DELAY = 800 as const;
function moveStyles() {
    readFile("./dist/umd/index.css.gz", (err) => {
        if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
        defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"));
    });
}

export default defineConfig({
    plugins: [
        vue(),
        compression({
            include: /.(cjs|css)$/i
        }),
        hooks({
            rmFiles: ['../dist/umd', '../dist/index.css'],
            afterBuild: moveStyles
        }),
        terser({
            compress: {
                drop_console: ["log"],
                drop_debugger: true,
                passes: 3,
                global_defs: {
                    "@DEV": JSON.stringify(isDev),
                    "@PROD": JSON.stringify(isProd),
                    "@TEST": JSON.stringify(isTest),
                },
            },
        }),
    ],
    build: {
        outDir: 'dist/umd',
        lib: {
            entry: resolve(__dirname, "../index.ts"),
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
