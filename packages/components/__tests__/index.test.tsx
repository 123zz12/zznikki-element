import type { Plugin } from 'vue'
import { map, get } from 'lodash-es'
import { describe, it, expect } from 'vitest'
import {
    ErAlert,
    ErButton,
    ErCollapse,
    ErButtonGroup,
    ErCollapseItem,
    ErIcon,
    ErTooltip,

} from ".."


const comps = [
    ErAlert,
    ErButton,
    ErCollapse,
    ErButtonGroup,
    ErCollapseItem,
    ErIcon,
    ErTooltip

] as Plugin[]

describe("components/index", () => {
    it.each(map(comps, (c) => [get(c, "name") ?? "", c]))(
        "%s should be exported",
        (_, component) => {
            expect(component).toBeDefined()
            expect(component.install).toBeDefined()
        }
    )
})
