import { State } from "../features/state"

export const localStateMiddleWare = store => next => action => {
    // dispatch action, update state
    const nextAction = next(action)

    // if the action changes the state, save local state
    isStateChanging(nextAction.type) && saveLocalState(store.getState())

    return nextAction
}

function isStateChanging(actionType: string): boolean {
    const stateChangingActions = ["settings/connectWallet/fulfilled", "items/loadItems/fulfilled", "settings/setProfileName", "settings/setProfileBio", "settings/setProfileImage/fulfilled", "settings/removeProfileImage", "settings/addProfileLink", "settings/removeProfileLink", "settings/reorderProfileLinks", "settings/addGallery/fulfilled", "settings/editConfig/fulfilled","settings/setUpdatedTrue", "items/hideItem", "items/showItem", "items/pinItem", "items/unpinItem"]

    // return true if current action is a state changing action
    return stateChangingActions.includes(actionType)
}

function saveLocalState(state: State): void {
    window.localStorage.setItem("state", JSON.stringify(state))
}

export function loadLocalState(): State | undefined {
    if(typeof localStorage != "undefined") {
        if("state" in localStorage) {
            const localState = JSON.parse(localStorage.getItem('state'))

            return {...localState}
        }
    }

    return undefined
}

export function deleteLocalState(): void {
    window.localStorage.clear()
    window.location = "/"
}