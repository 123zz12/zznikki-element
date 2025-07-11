import makeInstaller from "./makeInstaller";
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import components from "./components"
import printLogo from "./printLogo";
import '@zznikki-element/theme/index.css'
printLogo()
library.add(fas);
const installer = makeInstaller(components)

export * from '@zznikki-element/components'
export * from '@zznikki-element/locale'
export default installer