import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setPreviewMode, setEditMode, selectWalletAddress, selectPreviewMode } from "../../features/settings/settingsSlice"
import { condenseAddress } from "../../library/general"
import EditorWalletMenu from "./EditorWalletMenu"

export default function Editor() {
    const previewModeSetting = useAppSelector(selectPreviewMode)
    const [isPreviewMode, setPreviewMode] = useState(false)

    useEffect(() => {
        // display preview mode from global state
        setPreviewMode(previewModeSetting)
    })

    return isPreviewMode ? <EditorPreviewMode /> : < EditorEditMode/>
}

function EditorEditMode() {
    return (
        <div className="relative w-screen h-[70px] px-[20px] flex gap-x-4 justify-end items-center bg-rose-100 z-10">
            <EditorWallet />
            <EditorPreview />
        </div>
    )
}

function EditorPreviewMode() {
    const dispatch = useAppDispatch()

    const handleEditMode = () => {
        dispatch(setEditMode())
    }

    return (
        <div className="relative w-screen h-0 px-[20px] flex justify-end items-baseline z-10">
            <EditorEditButton handleEditMode={handleEditMode} />
        </div>
    )
}


function EditorWallet() {
    const walletAddress = useAppSelector(selectWalletAddress)
    const [displayAddress, setDisplayAddress] = useState("0x") 
    const [showWalletMenu, setShowWalletMenu] = useState(false)

    useEffect(() => {
        // if walllet address exists, condense and set to display
        walletAddress && setDisplayAddress(condenseAddress(walletAddress)) 
    })

    const handleShowMenu = () => {
        setShowWalletMenu(true)
    }

    const handleCloseMenu = () => {
        setShowWalletMenu(false)
    }

    return (
        <div>
            <EditorWalletButton handleShowMenu={handleShowMenu} address={displayAddress} />
            {showWalletMenu && <EditorWalletMenu handleCloseMenu={handleCloseMenu} />}
        </div>
    )
}
function EditorWalletButton({ handleShowMenu, address }) {
    return <button className="editorWalletButton" onClick={handleShowMenu}>{address}</button>
}

function EditorPreview() {
    const dispatch = useAppDispatch()

    const handlePreviewMode = () => {
        dispatch(setPreviewMode())
    }

    return (
        <div>
            <EditorPreviewButton  handlePreviewMode={handlePreviewMode} />
        </div>
    )
}
function EditorPreviewButton({ handlePreviewMode }) {
    return <button onClick={handlePreviewMode} className="editorWalletButton" >Preview</button>
}
function EditorEditButton({ handleEditMode }) {
    return <button onClick={handleEditMode} className="editModeButton" >Edit</button>
}