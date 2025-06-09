import Message from "./methods";
import { withInstallFunction } from "@zznikki-element/utils";

export const ErMessage = withInstallFunction(Message, "$message");

export * from "./types";