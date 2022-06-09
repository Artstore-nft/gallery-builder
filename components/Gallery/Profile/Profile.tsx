// import hooks
import { createContext, useContext, useEffect, useState } from 'react'
import { useAppSelector } from "../../../app/hooks"

// import features
import {
    selectWalletAddress, selectProfile, setProfileName, selectPreviewMode, ProfileType, initialSettingsState
} from "../../../features/settings/settingsSlice"

// import library function
import { condenseAddress } from "../../../library/general"

import ProfileImage from './ProfileImage'
import ProfileName from './ProfileName'
import ProfileBio from './ProfileBio'
import ProfileLinks from './ProfileLinks'

type ProfileAddressCopyContainerProps = {
    isCopied: boolean
}

type ProfileAddressCopyBoxProps = {
    isCopied: boolean
}


interface ProfileContextInterface {
    profile: ProfileType
    address: string
    previewMode: boolean
}

export const ProfileContext = createContext<ProfileContextInterface>(null)

export default function Profile() {
    const profile: ProfileType = useAppSelector(selectProfile)
    const address: string = useAppSelector(selectWalletAddress)
    const previewMode: boolean = useAppSelector(selectPreviewMode)

    const [displayProfile, setDisplayProfile] = useState(initialSettingsState.profile)
    const [displayAddress, setDisplayAddress] = useState("0x")
    const [showPreviewMode, setPreviewMode] = useState(false)


    useEffect(() => {
        // if profile exists, display profile
        profile && setDisplayProfile(profile)

        // if address exists, display address
        address && setDisplayAddress(address)

        // show preview mode status
        setPreviewMode(previewMode)
    })

    return (
        <ProfileContext.Provider value={{ profile: displayProfile, address: displayAddress, previewMode: showPreviewMode}} >
            <div className="grid grid-cols-1 gap-y-8 float-left w-[25%] px-[30px]">
                <ProfileHandle/>
                <ProfileBio />
                <ProfileLinks />
            </div>
        </ProfileContext.Provider>
    )
}

function ProfileHandle() {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileImage />
            <ProfileName />
            <ProfileAddress />
        </div>
    )
}
function ProfileAddress() {
    const { address } = useContext(ProfileContext)
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(address)

        // set isCopied to true
        setIsCopied(true)
    }

    return (
        <button
            className="flex gap-x-1 w-fit text-left font-normal px-[15px] py-[5px] rounded-full bg-white shadow-md cursor-pointer transition ease-in-out hover:shadow-lg hover:-translate-y-1" 
            onClick={handleCopyAddress} 
        >
            {condenseAddress(address)}<ProfileAddressCopyContainer isCopied={isCopied} />
        </button>
    )
}
function ProfileAddressCopyContainer({ isCopied }: ProfileAddressCopyContainerProps) {
    return (
        <div className="flex h-full items-center relative w-[19px]">
            <ProfileAddressCopyBox isCopied={isCopied} />
        </div>
    )
}
function ProfileAddressCopyBox({ isCopied }: ProfileAddressCopyBoxProps) {
    if (isCopied) {
        return (
            <div className="relative w-[15px] h-[15px]">
                <ProfileAddressCheckImage />
            </div>
        )
    } else {
        return (
            <div className="relative w-[19px] h-[19px]" >
                <ProfileAddressCopyImage />
            </div>
        )
    }
}
function ProfileAddressCopyImage() {
    return <img src="/images/icons/copy.svg" className="w-fit" /> 
}
function ProfileAddressCheckImage() {
    return <img src="/images/icons/checkMark.svg" className="w-fit" />
}