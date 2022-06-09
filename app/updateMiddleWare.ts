import { setUpdatedFalse } from "../features/settings/settingsSlice"

export default store => next => action => {
    // dispatch action, update state
    const nextAction = next(action)

    // if action type is update worthy, set updated false
    isUpdateWorthy(action.type) && store.dispatch(setUpdatedFalse(null))

    return nextAction
}

function isUpdateWorthy(actionType) {
    const updateWorthyActions = ["items/loadItems/fulfilled", "settings/setProfileName", "settings/setProfileBio", "settings/addProfileLink", "settings/removeProfileLink", "settings/reorderProfileLinks", "settings/setProfileImage", "settings/removeProfileImage", "items/hideItem", "items/showItem", "items/pinItem", "items/unpinItem"]

    // return true if current action is update worthy
    return updateWorthyActions.includes(actionType)
}