import { createApp } from 'vue'
import App from './App.vue'
import ZznikkiElement, { zhCn } from "zznikki-element"

import "zznikki-element/dist/index.css"

createApp(App).use(ZznikkiElement, { locale: zhCn }).mount('#app')
