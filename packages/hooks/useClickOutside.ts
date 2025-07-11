import { type Ref } from "vue";
import useEventListener from "./useEventListener.ts";

export default function useClickOutside(
    elementRef: Ref<HTMLElement | void>,
    callback: (e: MouseEvent) => void
) {
    useEventListener(document, "click", (e: Event) => {
        if (elementRef.value && e.target) {
            if (!elementRef.value.contains(e.target as HTMLElement)) {
                callback(e as MouseEvent);
            }
        }
    });
}
