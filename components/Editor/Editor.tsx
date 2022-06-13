import { useSession, signOut, signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { setPreviewMode, setEditMode, selectWalletAddress, selectPreviewMode, setGithubSession, selectGithub, editConfig, Github } from "../../features/settings/settingsSlice"
import { condenseAddress } from "../../library/general"
import EditorWalletMenu from "./EditorWalletMenu"
import EditorGithubMenu from "./EditorGithubMenu"

type EditorGithubSignOutButtonProps = {
    handleOpenMenu: () => void
}

type EditorWalletButtonProps = {
    handleShowMenu: () => void
    address: string
}

type EditorPreviewButtonProps = {
    handlePreviewMode: () => void
}

type EditorEditButtonProps = {
    handleEditMode: () => void
}

export default function Editor() {
    const previewModeSetting: boolean = useAppSelector(selectPreviewMode)
    const [isPreviewMode, setPreviewMode] = useState(false)

    useEffect(() => {
        // display preview mode from global state
        setPreviewMode(previewModeSetting)
    })

    return isPreviewMode ? <EditorPreviewMode /> : < EditorEditMode/>
}

function EditorEditMode() {
    return (
        <div className="relative w-screen h-[70px] px-[20px] bg-[#33A1E4] z-10 shadow-md flex gap-x-4 justify-end items-center">
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
    const github: Github = useAppSelector(selectGithub)

    useEffect(() => {
        session && dispatch(setGithubSession(session))
    }, [session])

    if (session && github.repo) {
        return <EditorGithubSave />
    } else {
        return session ? <EditorGithubSignedIn /> : <EditorGithubSignedOut />   
    }
}

function EditorGithubSignedIn() {
    const github: Github = useAppSelector(selectGithub)
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

function EditorGithubSignOutButton({ handleOpenMenu }: EditorGithubSignOutButtonProps) {
    return (
        <button onClick={handleOpenMenu} className="editorWalletButton relative flex gap-x-2 items-center">
            Add Gallery
            <EditorGithubLogoContainer />
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
    const walletAddress: string = useAppSelector(selectWalletAddress)
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
function EditorWalletButton({ handleShowMenu, address }: EditorWalletButtonProps) {
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
function EditorPreviewButton({ handlePreviewMode }: EditorPreviewButtonProps) {
    return <button onClick={handlePreviewMode} className="editorWalletButton" >Preview</button>
}
function EditorEditButton({ handleEditMode }: EditorEditButtonProps) {
    return <button onClick={handleEditMode} className="editModeButton" >Edit</button>
}

function EditorGithubSave() {
    const github: Github = useAppSelector(selectGithub)
    const [isUpdated, setIsUpdated] = useState(true)

    useEffect(() => {
        setIsUpdated(github.updated)
    }, [github])

    return isUpdated ? <EditorGithubUpdated /> : <EditorGithubNotUpdated />

}

function EditorGithubNotUpdated() {
    const dispatch = useAppDispatch()

    return (
        <button onClick={() => dispatch(editConfig())} className="editorWalletButton relative flex gap-x-2 items-center">
            Save Changes
            <EditorGithubLogoContainer /> 
        </button>
    ) 
}

function EditorGithubUpdated() {
    return (
        <button className="editorWalletButton relative flex gap-x-2 items-center">
            Updated
            <EditorGithubLogoContainer /> 
        </button>
    ) 
}