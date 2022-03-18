import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import connectWalletAPI from './api/connectWalletAPI'

// define initial state
const initialState = {
    chainId: null,
    walletAddress: null,
    walletConnected: false,
    itemsLoaded: "FALSE", // FALSE, PENDING, TRUE
}

// create and export async actions
export const connect = createAsyncThunk(
    'settings/connectWallet',
    async () => {
        const response = await connectWalletAPI()

        return response
    }
)
  

// create and export slice
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        disconnect: (state) => {
            state.chainId = null
            state.walletAddress = null
            state.walletConnected = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(connect.fulfilled, (state, action) => {
                state.chainId = action.payload.chainId
                state.walletAddress = action.payload.address
                state.walletConnected = true
            })
    }
})

// export actions
export const { disconnect } = settingsSlice.actions

// export selectors
export const selectChainId = (state) => state.settings.chainId
export const selectWalletAddress = (state) => state.settings.walletAddress
export const selectWalletConnected = (state) => state.settings.walletConnected
export const selectItemsLoaded = (state) => state.settings.itemsLoaded

// export reducer
export default settingsSlice.reducer