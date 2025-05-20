import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Zznikki-Element",
  description: "高仿ElementPlus组件库",
  base: "/zznikki-element/",
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组件', link: '/components/button' }
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/get-started' },
          // { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [{ text: "Button 按钮", link: "/components/button" }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/123zz12/zznikki-element' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview)
    }
  }
})

