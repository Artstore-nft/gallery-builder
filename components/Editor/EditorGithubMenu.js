import { useAppDispatch } from "../../app/hooks"

import { useState, useEffect, createContext, useContext } from "react"
import { useSession, signOut, signIn } from "next-auth/react"

import { addGallery } from "../../features/settings/settingsSlice"

const CloseMenuContext = createContext()

export default function EditorGithubMenu({ handleCloseMenu }) {
    return (
        <CloseMenuContext.Provider value={handleCloseMenu} >
            <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center">
                <MenuContainer />
                <MenuVeil />
            </div>
        </CloseMenuContext.Provider>
    )
}

function MenuVeil() {
    const handleCloseMenu = useContext(CloseMenuContext)
    return <div onClick={handleCloseMenu} className="absolute top-0 left-0 w-full h-full bg-black-veil"></div>   
}

function MenuContainer() {
    return(
        <div className="w-[400px] h-fit bg-white rounded-xl z-20 grid grid-cols-1 px-[20px]">
            <MenuHeader />
            <MenuContent />
            <MenuFooter />
        </div>
    )
}
function MenuHeader() {
    return(
        <div className="relative h-fit grid grid-cols-2 py-[12px]">
            <MenuTitle />
            <MenuClose />
        </div>
    )
}
function MenuTitle() {
    return <h1 className="text-lg font">Github</h1>
}
function MenuClose() {
    return (
        <div className="w-full h-full flex justify-end">
            <MenuCloseContainer />
        </div>
    )
}
function MenuCloseContainer() {
    const handleCloseMenu = useContext(CloseMenuContext)

    return (
        <div onClick={handleCloseMenu} className="flex h-full items-center relative w-[19px] hover:cursor-pointer">
            <MenuCloseBox />
        </div>
    )
}
function MenuCloseBox() {
    return (
        <div className="relative w-full apsect-square">
            <MenuCloseImage />
        </div>
    )
}
function MenuCloseImage() {
    return <img src="/images/icons/cross.svg" layout="fill" /> 
}

function MenuContent() {
    return (
        <div className="w-full grid grid-cols-1 gap-y-4 border-2 rounded-xl px-[15px] py-[10px]">
            <MenuSignOut />
            <AddGalleryHeader />
            <AddGalleryButton />
        </div>
    )
}

function MenuSignOut() {
    return (
        <div className="w-full h-fit flex justify-end">
            <SignOutButton />
        </div>
    )
}
function SignOutButton() {
    return <button onClick={() => signOut()} className="text-sm text-pink-500 px-[10px] py-[2px] border-[1px] border-pink-300 rounded-2xl hover:bg-pink-100">Sign out</button>
}

function AddGalleryHeader() {
    return (
        <div className="w-full grid grid-cols-1">
            <AddGalleryTitle />
            <AddGalleryDescription />
        </div>
    )
}

function AddGalleryTitle() {
    return <h1 className="text-xl">Add Gallery</h1>
}

function AddGalleryDescription() {
    return <h1 className="text-md text-gray-500">Add NFT gallery to your Github account.</h1>
}

function AddGalleryButton() {
    const dispatch = useAppDispatch()

    return <button onClick={() => dispatch(addGallery())} className="justify-self-center w-fit px-[15px] py-[3px] bg-blue-500 text-white rounded-2xl hover:bg-blue-600 active:bg-blue-700">+ Add</button>
}

function MenuFooter() {
    return <div className="w-full h-[50px]"></div>
}