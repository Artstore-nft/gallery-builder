import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import useSWR from 'swr'

import fetch from '../../library/api/fetch'
import loadItemsAPI from './api/loadItemsAPI'

// define initial state
const initialState = []

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
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loadItems.fulfilled, (state, action) => {
                return action.payload
            })
    }
})

// export selectors
export const selectItems = (state) => state.items

// export reducer
export default itemsSlice.reducer