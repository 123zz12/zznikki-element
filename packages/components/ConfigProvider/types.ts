import type { Language, TranslatePair } from "@zznikki-element/locale";

export interface ConfigProviderProps {
    locale?: Language;
    extendsI18nMsg?: TranslatePair;
}