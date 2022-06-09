import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import connectWalletAPI from './api/connectWalletAPI'
import addGalleryAPI from './api/addGalleryAPI'
import getInstallsAPI from './api/getInstallsAPI'

import { deleteLocalState } from '../../app/localState'
import getGalleryState from '../../library/getGalleryState'
import editConfigAPI from './api/editConfigAPI'
import addProfileImageAPI from './api/addProfileImageAPI'
import { ItemType, ItemId } from '../items/itemsSlice'
import { State } from '../state'

export type Wallet = {
    chainId: string
    address: string
}

export type ProfileType = {
    image: string
    name: string
    bio: string
    links: Link[]
}

export type Link = {
    location: string
    display: string
    logo: string
}

export type Github = {
    session?: GithubSession
    repo: string
    appInstalled: boolean
    updated: boolean
}

export type GithubSession = {
    accessToken: string
    expires: string
    user: {
        image: string
        name: string
    }
}

export interface SettingsState {
    chainId: string
    walletAddress: string
    walletConnected: boolean
    previewMode: boolean
    profile: ProfileType
    github: Github
}

export interface GalleryState {
    items: {
        items: ItemType[]
        hiddenItems: ItemId[]
        pinnedItems: ItemId[]
        order: "newest" | "oldest"
    },
    walletAddress: string
    profile: ProfileType
}

// define initial state
export const initialSettingsState: SettingsState = {
    chainId: null,
    walletAddress: null,
    walletConnected: false,
    previewMode: false,
    profile: {
        image: null,
        name: null,
        bio: null,
        links: [],
    },
    github: {
        session: null,
        repo: null,
        appInstalled: true,
        updated: true
    }
}

// create and export async actions
export const connectWallet = createAsyncThunk(
    'settings/connectWallet',
    async ():Promise<Wallet> => {
        return (await connectWalletAPI()) || Promise.reject()
    }
)

export const addGallery = createAsyncThunk(
    'settings/addGallery',
    async (arg, { getState } ): Promise<string> => {
        const state = getState() as State
        const galleryState = getGalleryState(state)
        const accessToken = state.settings.github.session.accessToken
        const username = state.settings.github.session.user.name
        return (await addGalleryAPI(accessToken, username, galleryState)) || Promise.reject()
    }
)

export const getInstalls = createAsyncThunk(
    'settings/getInstalls',
    async (arg, { getState }): Promise<boolean> => {
        const state = getState() as State
        const accessToken = state.settings.github.session.accessToken

        const response = await getInstallsAPI(accessToken)

        return (response !== undefined) ? response : Promise.reject()
    }
)

export const editConfig = createAsyncThunk(
    'settings/editConfig',
    async (arg, { getState }): Promise<void> => {
        const state = getState() as State
        const galleryState = getGalleryState(state)
        const accessToken = state.settings.github.session.accessToken
        const username = state.settings.github.session.user.name
        const repo = state.settings.github.repo

        await editConfigAPI(accessToken, username, repo, galleryState)
    }
)

export const setProfileImage = createAsyncThunk(
    'settings/setProfileImage',
    async (image: File, { getState }): Promise<string> => {
        const state = getState() as State
        const accessToken = state.settings.github.session.accessToken
        const username = state.settings.github.session.user.name
        const repo = state.settings.github.repo

        const response = await addProfileImageAPI(accessToken, username, repo, image)

        return (response !== undefined) ? image.name : Promise.reject()
    }
)
  
// create and export slice
export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettingsState,
    reducers: {
        disconnect: (state) => {
            deleteLocalState()
        },
        setPreviewMode: (state) => {
            state.previewMode = true
        },
        setEditMode: (state) => {
            state.previewMode = false
        },
        setProfileName: (state, action) => {
            state.profile = Object.assign({}, state.profile, { name: action.payload })
        },
        setProfileBio: (state, action) => {
            state.profile = Object.assign({}, state.profile, { bio: action.payload })
        },
        addProfileLink: (state, action) => {
            // update profile links with added link
            state.profile.links = state.profile.links.concat(action.payload)
        },
        removeProfileLink: (state, action) => {
            // update profile links with removed links
            state.profile.links = state.profile.links.filter(link=> link != state.profile.links[action.payload])
        },
        reorderProfileLinks: (state, action) => {
            const {linkId, newLinkId} = action.payload

            // remove link at old position and get link
            const [link] = state.profile.links.splice(linkId, 1)

            // insert link at new position
            state.profile.links.splice(newLinkId, 0, link)
        },
        removeProfileImage: (state, action) => {
            state.profile.image = null
        },
        setGithubSession: (state, action) => {
            state.github.session = action.payload
        },
        setUpdatedTrue: (state, action) => {
            state.github.updated = true
        },
        setUpdatedFalse: (state, action) => {
            state.github.updated = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.chainId = action.payload.chainId
                state.walletAddress = action.payload.address
                state.walletConnected = true
            })
            .addCase(getInstalls.fulfilled, (state, action) => {
                state.github.appInstalled = action.payload
            })
            .addCase(addGallery.fulfilled, (state, action) => {
                state.github.repo = action.payload
                state.github.updated = true  
            })
            .addCase(editConfig.fulfilled, (state, action) => {
                state.github.updated = true
            })
            .addCase(setProfileImage.fulfilled, (state, action) => {
                state.profile.image = action.payload
            })
    }
})

// export actions
export const { disconnect, setPreviewMode, setEditMode, setProfileName, setProfileBio, addProfileLink, removeProfileLink, reorderProfileLinks, removeProfileImage, setGithubSession, setUpdatedTrue, setUpdatedFalse } = settingsSlice.actions

// export selectors
export const selectChainId = (state) => state.settings.chainId
export const selectWalletAddress = (state) => state.settings.walletAddress
export const selectWalletConnected = (state) => state.settings.walletConnected
export const selectPreviewMode = (state) => state.settings.previewMode
export const selectProfile = (state) => state.settings.profile
export const selectGithub = (state) => state.settings.github

// export reducer
export default settingsSlice.reducer