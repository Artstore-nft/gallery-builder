import { useState } from 'react'
import Image from 'next/image'

// import features
import { useAppSelector } from "../../../app/hooks"
import {
    selectWalletAddress
} from "../../../features/settings/settingsSlice"

// import library function
import { condenseAddress } from "../../../library/general"

export default function Profile() {
    const walletAddress = useAppSelector(selectWalletAddress)

    return (
        <div className="grid grid-cols-1 gap-y-8 float-left w-[25%] px-[30px]">
            <ProfileHandle address={walletAddress} />
            <ProfileBio />
            <ProfileLinks />
        </div>
    )
}

function ProfileHandle({ address }) {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileImageContainer />
            <ProfileName />
            <ProfileAddress address={address} />
        </div>
    )
}
function ProfileImageContainer() {
    return(
        <div className="container px-[16%]">
            <ProfileImageBox />
        </div>
    )
}
function ProfileImageBox() {
    return (
        <div className="relative min-w-[100px] aspect-[1/1] rounded-full  overflow-hidden">
            <ProfileImage />
        </div>
    )
}
function ProfileImage() {
    return <Image src="https://pbs.twimg.com/profile_images/1479035114394845187/cYeg9mSk_400x400.png" layout="fill" />
}
function ProfileName() {
    return <h1 className="w-full text-4xl text-left font-semibold">Madhawk</h1>
}
function ProfileAddress({ address }) {
    const [isCopied, setIsCopied] = useState(false)
    const condensedAddress = condenseAddress(address)

    const handleCopyAddress = (e) => {
        const value = e.currentTarget.value
        navigator.clipboard.writeText(value)

        // set isCopied to true
        setIsCopied(true)
    }

    return (
        <button 
            className="flex gap-x-1 w-fit text-left font-normal px-[15px] py-[5px] rounded-full bg-white shadow-md cursor-pointer transition ease-in-out hover:shadow-lg hover:-translate-y-1" 
            value={address}
            onClick={handleCopyAddress} 
        >
            {condensedAddress}<ProfileAddressCopyContainer isCopied={isCopied} />
        </button>
    )
}
function ProfileAddressCopyContainer({ isCopied }) {
    return (
        <div className="flex h-full items-center relative w-[19px]">
            <ProfileAddressCopyBox isCopied={isCopied} />
        </div>
    )
}
function ProfileAddressCopyBox({ isCopied }) {
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
    return <Image src="/images/icons/copy.svg" layout="fill" /> 
}
function ProfileAddressCheckImage() {
    return <Image src="/images/icons/checkMark.svg" layout="fill" />
}

function ProfileBio() {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileBioTitle />
            <ProfileBioContent />
        </div>
    )
}
function ProfileBioTitle() {
    return <h1 className="text-left text-xl font-semibold border-b-[1px]">Bio</h1>
}
function ProfileBioContent() {
    return <p className="min-h-[40px]">Hello, this is my bio.</p>
}

function ProfileLinks() {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileLinksTitle />
            <ProfileLinksContent />
        </div>
    )
}
function ProfileLinksTitle() {
    return <h1 className="text-left text-xl font-semibold">Links</h1>
}
function ProfileLinksContent() {
    const links = [
        {
            location: 'https://twitter.com/madhawkcristian',
            name: '@madhawkcristian',
            logo: '/images/logos/twitter.svg'
        },
        {
            location: 'https://instagram.com/itsmecristian4life/',
            name: '@itsmecristian4life',
            logo: '/images/logos/instagram.png'
        },
        {
            location: 'https://facebook.com',
            name: 'Cristian Silva',
            logo: '/images/logos/facebook.png'
        },
        {
            location: 'https://artstore.lol',
            name: 'artstore.lol',
            logo: '/images/icons/website.svg'
        }

    ]

    return (
        <div className="grid grid-cols-1 gap-y-3">
            {
                links.map((link, k) => {
                    return <ProfileLink link={link} key={k} />
                })
            }
        </div>
    )
}
function ProfileLink({ link }) {
    return (
        <a href={link.location} target="_blank" rel="noreferrer" className="flex gap-x-1 w-fit text-left font-normal px-[15px] py-[5px] whitespace-nowrap rounded-full bg-white shadow-md cursor-pointer transition ease-in-out hover:shadow-lg hover:-translate-y-1">
            {link.logo && <ProfileLinkLogoContainer logo={link.logo} />}{link.name}
        </a>
    )
}
function ProfileLinkLogoContainer({ logo }) {
    return (
        <div className="flex items-center relative w-[19px]">
            <ProfileLinkLogoBox logo={logo} />
        </div>
    )
}
function ProfileLinkLogoBox({ logo }) {
    return (
        <div className="relative w-[19px] h-[19px]">
            <ProfileLinkLogo logo={logo} />
        </div>
    )
}
function ProfileLinkLogo({ logo }) {
    return <Image src={logo} layout="fill" />
}