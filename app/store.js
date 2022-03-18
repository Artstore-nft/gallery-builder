import { configureStore } from '@reduxjs/toolkit'

import settingsReducer from '../features/settings/settingsSlice'
import itemsReducer from '../features/items/itemsSlice'

export function makeStore() {
    return configureStore({
        reducer: { 
            settings: settingsReducer,
            items: itemsReducer,
        },
    })
  }
  
const store = makeStore()

export default store