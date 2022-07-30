interface DarkModeAction {
    type: string
}
export const DARK_MODE_ACTIONS: Record<string,DarkModeAction> = {
    "ON": {type: "onDarkModeAction"},
    "OFF": {type: "offDarkModeAction"}
};
