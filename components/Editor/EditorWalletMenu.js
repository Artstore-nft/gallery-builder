import { func } from "prop-types"
import { useState, useEffect, createContext, useContext } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectWalletAddress, disconnect } from "../../features/settings/settingsSlice" 
import { condenseAddress } from "../../library/general"

const CloseMenuContext = createContext()

export default function EditorWalletMenu({ handleCloseMenu }) {
    return( 
        <CloseMenuContext.Provider value={handleCloseMenu}>
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
    return <h1 className="text-lg font">Account</h1>
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
    const walletAddress = useAppSelector(selectWalletAddress)
    const [displayWalletAddress, setWalletAddress] = useState("0x")

    useEffect(() => {
        // if wallet address exists, set wallet address as display
        walletAddress && setWalletAddress(walletAddress)
    })

    return (
        <div className="w-full grid grid-cols-1 gap-y-2 border-2 rounded-xl px-[15px] py-[10px]">
            <MenuSignOut />
            <MenuAddress address={displayWalletAddress} />
            <MenuOptions address={displayWalletAddress} />
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
    const dispatch = useAppDispatch()
    return <button className="text-sm text-pink-500 px-[10px] py-[2px] border-[1px] border-pink-300 rounded-2xl hover:bg-pink-100" onClick={() => dispatch(disconnect())} >Disconnect</button>
}

function MenuAddress({ address}) {
    return <h1 className="text-2xl">{condenseAddress(address)}</h1>
}

function MenuOptions({ address }) {
    return (
        <div className="w-full h-fit flex gap-2 items-center">
            <MenuCopyAddress address={address} />
            <MenuViewExplorer address={address} />
        </div>
    )
}
function MenuCopyAddress({ address }) {
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address)
    }

    return (
        <div onClick={handleCopyAddress} className="w-fit h-fit px-[7px] py-[4px] flex gap-2 items-center rounded-2xl hover:bg-gray-200 hover:cursor-pointer active:-translate-y-1">
            <MenuCopyAddressIcon />
            <MenuCopyAddressTitle />
        </div>
    )
}
function MenuCopyAddressIcon() {
    return (
        <div className="flex h-full items-center relative w-[21px]">
            <MenuCopyAddressBox />
        </div>
    )
}
function MenuCopyAddressBox() {
    return (
        <div className="relative w-full apsect-square" >
            <MenuCopyAddressImage />
        </div>
    )
}
function MenuCopyAddressImage() {
    return <img src="/images/icons/copy.svg" layout="fill" /> 
}

function MenuCopyAddressTitle() {
    return <h1 className="text-md text-gray-600 select-none	">Copy Address</h1>
}

function MenuViewExplorer({ address }) {
    const handleViewExplorer = () => {
        const viewExploreAddress = "https://etherscan.io/address/" + address
        window.open(viewExploreAddress, "_blank") || (window.location = viewExploreAddress)
    }

    return ( 
        <div onClick={handleViewExplorer} className="w-fit h-fit px-[7px] py-[4px] flex gap-2 items-center rounded-2xl hover:bg-gray-200 hover:cursor-pointer">
            <MenuViewExploreIcon />
            <MenuViewExploreTitle />
        </div>
    )
}
function MenuViewExploreIcon() {
    return (
        <div className="flex h-full items-center relative w-[20px] ">
            <MenuViewExploreBox />
        </div>
    )
}
function MenuViewExploreBox() {
    return (
        <div className="relative w-full apsect-square" >
            <MenuViewExploreImage />
        </div>
    )
}
function MenuViewExploreImage() {
    return <img src="/images/logos/etherscan.svg" layout="fill" /> 
}
function MenuViewExploreTitle() {
    return <h1 className="text-md text-gray-600 select-none">View Explorer</h1>
}

function MenuFooter() {
    return <div className="w-full h-[50px]"></div>
}