import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import connectWalletAPI from './api/connectWalletAPI'
import addGalleryAPI from './api/addGalleryAPI'

import { deleteLocalState } from '../../app/localState'

// define initial state
export const initialSettingsState = {
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
        repo: null
    }
}

// create and export async actions
export const connectWallet = createAsyncThunk(
    'settings/connectWallet',
    async () => {
        return (await connectWalletAPI()) || Promise.reject()
    }
)

export const addGallery = createAsyncThunk(
    'settings/addGallery',
    async (arg, { getState }) => {
        const state = getState()
        const accessToken = state.settings.github.session.accessToken
        
        return (await addGalleryAPI(accessToken)) || Promise.reject()
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
        setProfileImage: (state, action) => {
            state.profile.image = action.payload
        },
        removeProfileImage: (state, action) => {
            state.profile.image = null
        },
        setGithubSession: (state, action) => {
            state.github.session = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.fulfilled, (state, action) => {
                state.chainId = action.payload.chainId
                state.walletAddress = action.payload.address
                state.walletConnected = true
            })
    }
})

// export actions
export const { disconnect, setPreviewMode, setEditMode, setProfileName, setProfileBio, addProfileLink, removeProfileLink, reorderProfileLinks, setProfileImage, removeProfileImage, setGithubSession } = settingsSlice.actions

// export selectors
export const selectChainId = (state) => state.settings.chainId
export const selectWalletAddress = (state) => state.settings.walletAddress
export const selectWalletConnected = (state) => state.settings.walletConnected
export const selectPreviewMode = (state) => state.settings.previewMode
export const selectProfile = (state) => state.settings.profile
export const selectGithub = (state) => state.settings.github

// export reducer
export default settingsSlice.reducer