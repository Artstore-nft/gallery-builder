import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useSWR from 'swr'

import fetch from '../../library/api/fetch'
import compareItemIds from '../../library/items/compareItemIds'
import indexOfItemId from '../../library/items/indexOfItemId'
import loadItemsAPI from './api/loadItemsAPI'

// define initial state
export const initialItemsState = {
    items: [],
    hiddenItems: [],
    pinnedItems: [],
    itemsLoaded: "FALSE", // FALSE, PENDING, TRUE
    order: "newest" // newest, oldest
}

// create and export async actions
export const loadItems = createAsyncThunk(
    'items/loadItems',
    async (walletAddress) => {
        const response = await loadItemsAPI(walletAddress)
        
        return response
    }
)

// create and export slice
export const itemsSlice = createSlice({
    name: 'items',
    initialState: initialItemsState,
    reducers: {
        setItemsOrder: (state, action) => {
            state.order = action.payload
        },
        hideItem: (state, action) => {
            const stringId = JSON.stringify(action.payload)
            const stringHiddenItems = state.hiddenItems.map(item => JSON.stringify(item))

            // if hidden items do not include item id, add item to list
            !stringHiddenItems.includes(stringId) && state.hiddenItems.push(action.payload)

        },
        showItem: (state, action) => {
            const stringId = JSON.stringify(action.payload)
            const stringHiddenItems = state.hiddenItems.map(item => JSON.stringify(item))

            // if hidden items include item id, remove item from list
            stringHiddenItems.includes(stringId) && state.hiddenItems.splice(stringHiddenItems.indexOf(stringId), 1)
        },
        pinItem: (state, action) => {
            const stringId = JSON.stringify(action.payload)
            const stringPinnedItems = state.pinnedItems.map(item => JSON.stringify(item))

            // if pinned items do not include item id, add item to list
            !stringPinnedItems.includes(stringId) && state.pinnedItems.push(action.payload)
        },
        unpinItem: (state, action) => {
            const stringId = JSON.stringify(action.payload)
            const stringPinnedItems = state.pinnedItems.map(item => JSON.stringify(item))

            // if pinned items include item id, remove item from list
            stringPinnedItems.includes(stringId) && state.pinnedItems.splice(stringPinnedItems.indexOf(stringId), 1)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadItems.pending, (state, action) => {
                state.itemsLoaded = "PENDING"
            })
            .addCase(loadItems.fulfilled, (state, action) => {
                state.items = action.payload
                state.itemsLoaded = "TRUE"
            })
    }
})

// export actions
export const { setItemsOrder, hideItem, showItem, pinItem, unpinItem } = itemsSlice.actions

// export selectors
export const selectItems = (state) => state.items.items
export const selectItemsLoaded = (state) => state.items.itemsLoaded
export const selectItemsOrder = (state) => state.items.order
export const selectHiddenItems = (state) => state.items.hiddenItems
export const selectPinnedItems = (state) => state.items.pinnedItems

// export reducer
export default itemsSlice.reducer