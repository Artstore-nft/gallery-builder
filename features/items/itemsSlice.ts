import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loadItemsAPI from './api/loadItemsAPI'

export type ItemType = {
    amount: string
    block_number: string
    block_number_minted: string
    contract_type: string
    last_metadata_sync?: string
    last_token_uri_sync?: string
    name: string
    owner_of: string
    symbol: string
    synced_at: string
    token_address: string
    token_hash?: string
    token_id: string
    token_uri: string
    metadata?: ItemMetadata | string
    id?: ItemId
    image?: ItemImage
    info?: ItemInfo
}

export type ItemMetadata = {
    name: string
    description: string
    image: string
    [key: string]: any
}

export type ItemId = {
    address: string
    id: string
}

export type ItemImage = {
    source: string
    type: "image" | "video"
}

export type ItemInfo = {
    name: string
    description: string
    collection: string
    ownedBy: string
    attributes?: ItemAttribute[]
}

export type ItemAttribute = {
    [key: string]: any
}

export interface ItemsState {
    items: ItemType[]
    hiddenItems: ItemId[]
    pinnedItems: ItemId[]
    itemsLoaded: "FALSE" | "PENDING" | "TRUE"
    order: "newest" | "oldest"
}

export const defaultMetadata: ItemMetadata = {
    name: "",
    description: "",
    image: ""
}

export const defaultItem: ItemType = {
    amount: "",
    block_number: "",
    block_number_minted: "",
    contract_type: "",
    last_metadata_sync: "",
    last_token_uri_sync: "",
    name: "",
    owner_of: "",
    symbol: "",
    synced_at: "",
    token_address: "",
    token_hash: "",
    token_id: "",
    token_uri: "",
    metadata: defaultMetadata,
    id: {
        address: "",
        id: ""
    },
    image: {
        source: "",
        type: "image"
    },
    info: {
        name: "",
        description: "",
        collection: "",
        ownedBy: ""
    },
}

// define initial state
export const initialItemsState: ItemsState = {
    items: [],
    hiddenItems: [],
    pinnedItems: [],
    itemsLoaded: "FALSE",
    order: "newest"
}

// create and export async actions
export const loadItems = createAsyncThunk(
    'items/loadItems',
    async (walletAddress: string): Promise<ItemType[]> => {
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