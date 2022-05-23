export const localStateMiddleWare = store => next => action => {
    // dispatch action, update state
    const nextAction = next(action)

    // if the action changes the state, save local state
    isStateChanging(nextAction.type) && saveLocalState(store.getState())

    return nextAction
}

function isStateChanging(actionType) {
    const stateChangingActions = ["settings/connectWallet/fulfilled", "items/loadItems/fulfilled", "settings/setProfileName", "settings/addProfileLink", "settings/removeProfileLink", "settings/reorderProfileLinks"]

    // return true if current action is a state changing action
    return stateChangingActions.includes(actionType)

}

function saveLocalState(state) {
    console.log(state)
    window.localStorage.setItem("state", JSON.stringify(state))
}

export function loadLocalState() {
    if(typeof localStorage != "undefined") {
        if("state" in localStorage) {
            const localState = JSON.parse(localStorage.getItem('state'))

            return {...localState}
        }
    }

    return undefined
}

export function deleteLocalState() {
    window.localStorage.clear()
    window.location = "/"
}