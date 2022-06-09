import { GalleryState } from "../features/settings/settingsSlice"
import { State } from "../features/state"



export default function getGalleryState(state: State): GalleryState {
    return {
        items: {
            items: state.items.items,
            hiddenItems: state.items.hiddenItems,
            pinnedItems: state.items.pinnedItems,
            order: state.items.order
        },
        walletAddress: state.settings.walletAddress,
        profile: state.settings.profile
    }
}