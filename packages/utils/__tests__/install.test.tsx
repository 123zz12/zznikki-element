import { describe, expect, it } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, createApp } from "vue"
import { makeInstaller, withInstall } from "../install"

const AppComp = defineComponent({
    setup() {
        return () => <div>App</div>
    }
})

const compA = withInstall(defineComponent({
    name: 'compA',
    setup() {
        return () => <div>compA</div>
    }
}))
const compB = withInstall(defineComponent({
    name: 'compB',
    setup() {
        return () => <div>compB</div>
    }
}))

describe('install', () => {
    it('withInstall should be worked', () => {
        const wrapper = mount(() => <div id="app"></div>)
        const app = createApp(AppComp)
        app.use(compA).mount(wrapper.element)

        expect(compA.install).toBeDefined
        expect(compB.install).toBeDefined
        expect(app._context.components["compA"]).toBeTruthy()
        expect(app._context.components["compB"]).toBeFalsy()
    })

    it('makeInstaller should be worked', () => {
        const wrapper = mount(() => <div id="app"></div>)
        const app = createApp(AppComp)
        const installer = makeInstaller([compA, compB])

        app.use(installer).mount(wrapper.element)

        expect(installer).toBeDefined()
        expect(app._context.components["compA"]).toBeTruthy()
        expect(app._context.components["compB"]).toBeTruthy()
    })

})