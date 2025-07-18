import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from '@zznikki-element/utils'

export const ErConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'