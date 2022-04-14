import { configureStore } from '@reduxjs/toolkit'
import { localStateMiddleWare, loadLocalState } from './localState'
import settingsReducer from '../features/settings/settingsSlice'
import itemsReducer from '../features/items/itemsSlice'

function makeStore() {    
    return configureStore({
        reducer: {
            settings: settingsReducer,
            items: itemsReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStateMiddleWare),
        preloadedState: loadLocalState()
    })
}
  
export default makeStore()