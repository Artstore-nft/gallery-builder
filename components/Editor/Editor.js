import { useSession, signOut, signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setPreviewMode, setEditMode, selectWalletAddress, selectPreviewMode, setGithubSession, selectGithub } from "../../features/settings/settingsSlice"
import { condenseAddress } from "../../library/general"
import EditorWalletMenu from "./EditorWalletMenu"
import EditorGithubMenu from "./EditorGithubMenu"

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
        <div className="relative w-screen h-[70px] px-[20px] bg-rose-100 z-10 shadow-md flex gap-x-4 justify-end items-center">
            <EditorGithub />
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

function EditorGithub() {
    const dispatch = useAppDispatch()
    const { data: session } = useSession()

    useEffect(() => {
        session && dispatch(setGithubSession(session))

        console.log(session)
    }, [session])

    return session ? <EditorGithubSignedIn /> : <EditorGithubSignedOut />
}

function EditorGithubSignedIn() {
    const github = useAppSelector(selectGithub)
    const [showMenu, setShowMenu] = useState(false)

    const handleOpenMenu = () => {
        setShowMenu(true)
    }

    const handleCloseMenu = () => {
        setShowMenu(false)
    }

    return (
        <div>
            <EditorGithubSignOutButton handleOpenMenu={handleOpenMenu} />
            {showMenu && <EditorGithubMenu handleCloseMenu={handleCloseMenu} />}
        </div>
    )
}

function EditorGithubSignOutButton({ handleOpenMenu }) {
    return (
        <button onClick={handleOpenMenu} className="editorWalletButton relative flex gap-x-2 items-center">
            Connected
        </button>
    )
}

function EditorGithubSignedOut() {
    return (
        <button onClick={() => signIn("github")} className="editorWalletButton relative flex gap-x-2 items-center">
            Connect to Github
            <EditorGithubLogoContainer /> 
        </button>
    ) 
}

function EditorGithubLogoContainer() {
    return (
        <div className="relative flex-inline max-h-[24px] h-full py-[1px]">
            <EditorGithubLogo />
        </div>
    )
}
function EditorGithubLogo() {
    return <img src="/images/logos/github.svg" className="relative h-[22px] object-contain" />
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