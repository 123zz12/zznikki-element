import type { Placement, Options } from "@popperjs/core"

export interface TooltipProps {
    content?: string
    placement?: Placement
    trigger?: 'hover' | 'click' | 'contextmenu'
    manual?: boolean
    disabled?: boolean
    popperOptions?: Partial<Options>
    transition?: string
    showTimeout?: number
    hideTimeout?: number
}

export interface TooltipEmits {
    (e: "visible-change", value: boolean): void
    (e: "click-outside"): void;
}

export interface TooltipInstance {
    show(): void;
    hide(): void;
}