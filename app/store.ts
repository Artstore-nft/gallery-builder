import { configureStore } from '@reduxjs/toolkit'
import { localStateMiddleWare, loadLocalState } from './localState'
import settingsReducer from '../features/settings/settingsSlice'
import itemsReducer from '../features/items/itemsSlice'
import updateMiddleWare from './updateMiddleWare'

function makeStore() {    
    return configureStore({
        reducer: {
            settings: settingsReducer,
            items: itemsReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStateMiddleWare).concat(updateMiddleWare),
        preloadedState: loadLocalState()
    })
}
  
export default makeStore()