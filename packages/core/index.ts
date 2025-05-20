import { makeInstaller } from "@zznikki-element/utils";
import components from "./components"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import '@zznikki-element/theme/index.css'
import printLogo from "./printLogo";

printLogo()
library.add(fas);
const installer = makeInstaller(components)

export * from '@zznikki-element/components'
export default installer