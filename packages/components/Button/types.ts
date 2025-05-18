export type ButtonType = "primary" | "success" | "warning" | "danger" | "info"
export type NativeType = "button" | "reset" | "submit"
export type ButtonSize = "large" | "default" | "small"
// import { size } from "lodash-es";
export interface ButtonProps {
    tag?: string | Component;
    type?: ButtonType;
    size?: ButtonSize;
    nativeType?: NativeType;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    circle?: boolean;
    plain?: boolean;
    round?: boolean;
    loadingIcon?: string;
    autofocus?: boolean;
    useThrottle?: boolean;
    throttleDuration?: number;
}

export interface ButtonGroupProps {
    size?: ButtonSize;
    type?: ButtonEmits;
    disabled?: boolean;
}
export interface ButtonGroupContext {
    size?: ButtonSize;
    type?: ButtonEmits;
    disabled?: boolean;
}

export interface ButtonEmits {
    (e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
    ref: Ref<HTMLButtonElement | void>;
}
