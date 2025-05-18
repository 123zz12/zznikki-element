import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path";
import dts from "vite-plugin-dts"
import { readdirSync } from "fs"
import { map, filter } from "lodash-es"

function getDirectoriesSync(basePath: string) {
    const entries = readdirSync(basePath, { withFileTypes: true })
    return map(
        filter(entries, (entry) => entry.isDirectory()),
        (entry) => entry.name
    )
}
// const COMP_NAMES = [
//     "Alert",
//     "Button",
//     "Collapse",
//     "Dropdown",
//     "Form",
//     "Icon",
//     "Input",
//     "Loading",
//     "Message",
//     "MessageBox",
//     "Notification",
//     "Overlay",
//     "Popconfirm",
//     "Select",
//     "Switch",
//     "Tooltip",
//     "Upload",
// ] as const;

export default defineConfig({
    plugins: [vue(), dts({
        tsconfigPath: '../../tsconfig.build.json',
        outDir: "dist/types"
    })],
    build: {
        outDir: 'dist/es',
        lib: {
            entry: resolve(__dirname, "./index.ts"),
            name: "ZznikkiElement",
            fileName: "index",
            formats: ["es"]
        },
        rollupOptions: {
            external: [
                "vue",
                "@fortawesome/fontawesome-svg-core",
                "@fortawesome/free-solid-svg-icons",
                "@fortawesome/vue-fontawesome",
                "@popperjs/core",
                "async-validator",
            ],
            output: {

                assetFileNames: (assetInfo) => {
                    // assetInfo.names 是一个字符串数组
                    if (assetInfo.names?.includes("style.css")) {
                        return "index.css";
                    }
                    // 回退用文件名里的第一个（一般就一个）
                    return assetInfo.names?.[0] ?? "[name].[ext]";
                },
                manualChunks: (id) => {
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                    if (id.includes("/packages/hooks")) {
                        return "hooks";
                    }
                    if (id.includes("/packages/utils")) {
                        return "utils";
                    }
                    for (const item of getDirectoriesSync("../components")) {
                        if (id.includes(`/packages/components/${item}`)) {
                            return item;
                        }
                    }
                }
            }
        }
    }
})
