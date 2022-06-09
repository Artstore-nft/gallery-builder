import { ItemsState } from "./items/itemsSlice"
import { SettingsState } from "./settings/settingsSlice"

export interface State {
    items: ItemsState
    settings: SettingsState
}