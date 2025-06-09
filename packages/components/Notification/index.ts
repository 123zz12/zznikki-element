import Notification from "./methods";
import { withInstallFunction } from '@zznikki-element/utils'

export const ErNotification = withInstallFunction(Notification, '$notify')

export * from './types'