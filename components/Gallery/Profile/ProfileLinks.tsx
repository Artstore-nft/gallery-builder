// import hooks
import { ChangeEvent, ChangeEventHandler } from 'react'
import { createRef, MouseEventHandler, MutableRefObject, useCallback, useContext, useEffect, useRef, useState, MouseEvent } from 'react'
import { useAppDispatch } from "../../../app/hooks"

// import features
import {
    addProfileLink, removeProfileLink, reorderProfileLinks, Link
} from "../../../features/settings/settingsSlice"

import { ProfileContext } from './Profile'

type LinkType = {
    id: string
    label: string
    display: string
    location: string 
    logo: string 
}

type ProfileLinksPreviewProps = {
    links: Link[]
}

type ProfileLinksContentProps = {
    links: Link[]
}

type ProfileLinkProps = {
    link: Link
}

type ProfileLinkLogoContainerProps = {
    logo: string
}

type ProfileLinkLogoProps = {
    logo: string
}

type ProfileLinksEditProps = {
    links: Link[]
}

type ProfileLinksMissingProps = {
    handleStartInput: () => void
}

type AddLinksButtonProps = {
    handleStartInput: () => void
}

type ProfileLinksInputProps = {
    profileLinksInputRef: MutableRefObject<HTMLInputElement>
    handleEndInput: () => void
    links: Link[]
}

type ProfileLinksNoInputProps = {
    handleStartInput: () => void
    links: Link[]
}

type ProfileLInksOptionsProps = {
    handleStartRemove: () => void
    handleStartAdd: () => void
}

type ProfileLinksContentEditProps = {
    links: Link[]
}

type ProfileLinkEditProps = {
    linkRefs: MutableRefObject<HTMLDivElement>[]
    handleStartDrag: (e: MouseEvent<HTMLDivElement>) => void
    link: Link
    linkId: number
}

type ReorderLinkButtonProps = {
    handleStartDrag: (e: MouseEvent<HTMLDivElement>) => void
}

type EditLinksButtonProps = {
    handleStartInput: () => void
}

type RemoveLinksButtonProps = {
    handleStartRemove: () => void
}

type AddLinkButtonProps = {
    handleStartAdd: () => void
}

type ProfileLinksContentRemoveProps = {
    links: Link[]
}

type ProfileLinkRemoveProps = {
    handleRemoveLink: (linkId: number) => void
    link: Link
    linkId: number
}

type RemoveLinkButtonProps = {
    handleRemoveLink: (linkId: number) => void
    linkId: number
}

type AddLinkFormProps = {
    addLinkFormRef: MutableRefObject<HTMLFormElement>
    handleEndAdd: () => void
}

type LinkTypeProps = {
    handleChangeType: ChangeEventHandler<HTMLSelectElement>
    linkTypeRef: MutableRefObject<HTMLSelectElement>
}
type LinkTypeSelectProps = {
    handleChangeType: ChangeEventHandler<HTMLSelectElement>
    linkTypeRef: MutableRefObject<HTMLSelectElement>
}

type LinkTypeOptionProps = {
    linkTypeId: string
    label: string
}

type LinkLocationProps = {
    linkLocationRef: MutableRefObject<HTMLInputElement>
}

type LinkLocationInputProps = {
    linkLocationRef: MutableRefObject<HTMLInputElement>
}

type LinkDisplayProps = {
    linkDisplayRef: MutableRefObject<HTMLInputElement>
}

type LinkDisplayInputProps = {
    linkDisplayRef: MutableRefObject<HTMLInputElement>
}

type LinkAddOptionsProps = {
    handleEndAdd: () => void
}

type LinkCancelButtonProps = {
    handleEnd: () => void
}

type LinkCancelButtonRightProps = {
    handleEnd: () => void   
}

const linkTypes: LinkType[] = [
    {
        id: "foundation",
        label: "Foundation",
        display: "@",
        location: "https://foundation.app/@",
        logo: "/images/logos/foundation.svg",
    },
    {
        id: "opensea",
        label: "OpenSea",
        display: "",
        location: "https://opensea.io/",
        logo: "/images/logos/opensea.svg",
    },
    {
        id: "superrare",
        label: "SuperRare",
        display: "@",
        location: "https://superrare.com/",
        logo: "/images/logos/superrare.png",
    },
    {
        id: "rarible",
        label: "Rarible",
        display: "",
        location: "https://rarible.com/",
        logo: "/images/logos/rarible.svg",
    },
    {
        id: "etherscan",
        label: "Etherscan",
        display: "",
        location: "https://etherscan.io/address/",
        logo: "/images/logos/etherscan.svg",
    },
    {
        id: "facebook",
        label: "Facebook",
        display: "",
        location: "https://facebook.com/",
        logo: "/images/logos/facebook.png",
    },
    {
        id: "instagram",
        label: "Instagram",
        display: "@",
        location: "https://www.instagram.com/",
        logo: "/images/logos/instagram.png",
    },
    {
        id: "twitter",
        label: "Twitter",
        display: "@",
        location: "https://twitter.com/",
        logo: "/images/logos/twitter.svg",
    },
    {
        id: "other",
        label: "Other",
        display: "",
        location: "",
        logo: "/images/icons/website.svg",
    },
]

export default function ProfileLinks() {
    const { profile: { links }, previewMode } = useContext(ProfileContext) || null
    
    // If preview mode is on show links, else show links form
    if (previewMode) {
        // if links exists show links, else show nothing
        return links.length ? <ProfileLinksPreview links={links} /> : null
    } else {
        // if input mode is on or links exists show links form, else show add links prompt
        return <ProfileLinksEdit links={links} />
    }
}

function ProfileLinksPreview({ links }: ProfileLinksPreviewProps) {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileLinksTitle />
            <ProfileLinksContent links={links} />
        </div>
    )
}
function ProfileLinksTitle() {
    return <h1 className="text-left text-xl font-semibold border-b-[1px] mb-2">Links</h1>
}
function ProfileLinksContent({ links }: ProfileLinksContentProps) {
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
function ProfileLink({ link }: ProfileLinkProps) {
    return (
        <a href={link.location} target="_blank" rel="noreferrer" className="flex gap-x-2 items-center w-fit text-left font-normal px-[15px] py-[5px] whitespace-nowrap rounded-full bg-white shadow-md cursor-pointer transition ease-in-out hover:shadow-lg hover:-translate-y-1">
            {link.logo && <ProfileLinkLogoContainer logo={link.logo} />}{link.display}
        </a>
    )
}
function ProfileLinkLogoContainer({ logo }: ProfileLinkLogoContainerProps) {
    return (
        <div className="relative flex-inline max-w-[30px] max-h-[18px]  h-full ">
            <ProfileLinkLogo logo={logo} />
        </div>
    )
}
function ProfileLinkLogo({ logo }: ProfileLinkLogoProps) {
    return <img src={logo} className="h-full object-contain" />
}

function ProfileLinksEdit({ links }: ProfileLinksEditProps) {
    const profileLinksInputRef = useRef<HTMLInputElement>()
    const [inputMode, setInputMode] = useState(false)

    // handle events
    const handleStartInput = () => {
        // set input mode true
        setInputMode(true)

        // start listening for clicks outside of input
        document.addEventListener("mousedown", handleClickOutside)
    }
    const handleEndInput = () => {
        // set input mode false and stop listening for clicks outside of input
        setInputMode(false)
        document.removeEventListener("mousedown", handleClickOutside)
    }
    const handleClickOutside = (e) => {
        // if form exists and click is not inside of form, end input mode
        profileLinksInputRef.current && !profileLinksInputRef.current.contains(e.target) && handleEndInput()
    }

    if(inputMode) {
        return <ProfileLinksInput profileLinksInputRef={profileLinksInputRef}  handleEndInput={handleEndInput} links={links} />
    } else {
        return links.length ? <ProfileLinksNoInput handleStartInput={handleStartInput} links={links} /> : <ProfileLinksMissing handleStartInput={handleStartInput} />
    }
}

function ProfileLinksMissing({ handleStartInput }: ProfileLinksMissingProps) {
    return (
        <div className="profileMissing">
            <AddLinksButton handleStartInput={handleStartInput} />
        </div>
    )
}
function AddLinksButton({ handleStartInput }: AddLinksButtonProps) {
    return <button onClick={handleStartInput} className="profileButton">+ Add Links</button>
}

function ProfileLinksNoInput({ handleStartInput, links }: ProfileLinksNoInputProps) {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileLinksTitle />
            <ProfileLinksContent links={links} />
            <EditLinksButton handleStartInput={handleStartInput} />
        </div>
    ) 
}

function ProfileLinksInput({ profileLinksInputRef, handleEndInput, links }: ProfileLinksInputProps) {
    const addLinkFormRef = useRef<HTMLFormElement>()
    const removeLinkFormRef = useRef<HTMLFormElement>()
    const [addMode, setAddMode] = useState(false)
    const [removeMode, setRemoveMode] = useState(false)

    useEffect(() => {
        // if there are no links, set remove mode off 
        if (!links.length) {
            setRemoveMode(false)
            setAddMode(true)
        }
    })

    const handleStartAdd = () => {
        setAddMode(true)

        // start listening for clicks outside of input
        document.addEventListener("mousedown", handleClickOutside)
    }
    const handleEndAdd = () => {
        // if there are no links, end input mode
        !links.length && handleEndInput()

        setAddMode(false)

        // stop listening for clicks outside of input
        document.removeEventListener("mousedown", handleClickOutside)
    }

    const handleStartRemove = () => {
        setRemoveMode(true)

        // start listening for clicks outside of input
        document.addEventListener("mousedown", handleClickOutside)
    }
    const handleEndRemove = () => {
        setRemoveMode(false)

        // stop listening for clicks outside of input
        document.removeEventListener("mousedown", handleClickOutside)
    }

    const handleClickOutside = (e) => {
        // if add mode is on and form exists and click is not inside of form, end input mode
        addMode && addLinkFormRef.current && !addLinkFormRef.current.contains(e.target) && handleEndAdd()

        // if remove mode is on and form exists and click is not inside of form, end input mode
        removeMode && removeLinkFormRef.current && !removeLinkFormRef.current.contains(e.target) && handleEndRemove()
    }

    return (
        <div ref={profileLinksInputRef} className="grid grid-cols-1 gap-y-2">
            <ProfileLinksTitle />
            <LinkCancelButtonRight handleEnd={handleEndInput} />
            {removeMode ?  <ProfileLinksContentRemove links={links} /> : <ProfileLinksContentEdit links={links} /> }
            {addMode ? <AddLinkForm addLinkFormRef={addLinkFormRef} handleEndAdd={handleEndAdd} /> : removeMode ? <LinkCancelButton handleEnd={handleEndRemove} /> : <ProfileLInksOptions handleStartRemove={handleStartRemove} handleStartAdd={handleStartAdd} /> }
        </div> 
    )


}

function ProfileLInksOptions({ handleStartRemove, handleStartAdd }: ProfileLInksOptionsProps) {
    return (
        <div className="grid grid-cols-2 items-center justify-center">
            <RemoveLinksButton handleStartRemove={handleStartRemove} />
            <AddLinkButton handleStartAdd={handleStartAdd} />
        </div>
    )
}

function ProfileLinksContentEdit({ links }: ProfileLinksContentEditProps) {
    const dispatch = useAppDispatch()
    const draggedLink = useRef<HTMLDivElement>()
    const [linkRefs, setLinkRefs] = useState([])
    const [startDragPosition, setStartDragPosition] = useState(0)
    const [currentDragPosition, setCurrentDragPosition] = useState(0)
    const [dropPosition, setDropPosition] = useState()

    // set link refs on links updates
    useEffect(() => {
        // set links refs to be an array of refs with length of links
        setLinkRefs(Array(links.length).fill(undefined).map(() => createRef<HTMLDivElement>()))
    }, [links])

    // handle drag on drag position updates
    useEffect(() => {
        handleDrag()
    }, [currentDragPosition])

    // handle drop on drop position updates
    useEffect(() => {
        handleDrop()
    }, [dropPosition])

    const handleStartDrag = (e: MouseEvent<HTMLDivElement>): void => {
        // map through all link refs 
        linkRefs.map((linkRef) => {
            // if link ref exists and link ref contains clicked button
            if (linkRef.current && linkRef.current.contains(e.target)) { 
                // set dragged link ref to current link ref in loop
                draggedLink.current = linkRef.current

                // set starting drag position
                setStartDragPosition(e.clientY)

                draggedLink.current.style.zIndex = "15"
            }
        })



        // start listening for drag and drop events
        window.addEventListener('mousemove', dragListener)
        window.addEventListener('mouseup', dropListener)
    }

    const handleDrag = () => {
        const movedDragPosition = currentDragPosition - startDragPosition

        if (draggedLink.current) {
            draggedLink.current.style.transform = `translateY(${movedDragPosition}px)`
        }
    }

    const handleDrop = () => {
        if(!draggedLink.current) return null

        const movedDragPosition = currentDragPosition - startDragPosition
        const draggedLinkPosition = draggedLink.current.offsetTop + movedDragPosition
        let  draggedLinkId 
        const linkPositions = []

        linkRefs.map((linkRef, k) => {
            let linkPosition = {
                id: k,
                position: 0
            }

            if(linkRef.current == draggedLink.current) {
                draggedLinkId = k

                linkPosition.position = linkRef.current.offsetTop + movedDragPosition
            } else {
                linkPosition.position = linkRef.current.offsetTop
            }

            linkPositions.push(linkPosition)
        })

        const sortedlinkPositions = Array.from(linkPositions).sort((firstLink, secondLink) => firstLink.position - secondLink.position)

        if (sortedlinkPositions == linkPositions) {
            return null
        } else {
            const newLinkId = sortedlinkPositions.findIndex( ({ id }) => id == draggedLinkId)

            dispatch(reorderProfileLinks({linkId: draggedLinkId, newLinkId}))
        }

        draggedLink.current.style.zIndex = "0"
        draggedLink.current.style.transform = `translateY(0)`
    }

    // set listeners
    const dragListener = (e) => {
        setCurrentDragPosition(e.clientY)
    }

    const dropListener = (e) => {
        setDropPosition(e.clientY)

        // stop listening for drag and drop events
        window.removeEventListener('mousemove', dragListener)
        window.removeEventListener('mouseup', dropListener)
    }

    return (
        <div className="grid grid-cols-1 gap-y-3 pb-[15px]">
            {
                links.map((link, k) => {
                    return <ProfileLinkEdit linkRefs={linkRefs} handleStartDrag={handleStartDrag} key={k} link={link} linkId={k} />
                })
            }
        </div>
    )
}

function ProfileLinkEdit({ linkRefs, handleStartDrag, link, linkId }: ProfileLinkEditProps) {
    return (
        <div ref={linkRefs[linkId]} className="relative flex justify-between">
            <ProfileLink link={link} />
            <ReorderLinkButton handleStartDrag={handleStartDrag} />
        </div>
    )
}
function ReorderLinkButton({ handleStartDrag }: ReorderLinkButtonProps) {
    return (
        <div onMouseDown={handleStartDrag} className="relative h-full p-[7px] rounded-xl overflow-hidden cursor-grab hover:bg-gray-100 active:cursor-grabbing">
            <ReorderImage />
        </div>
    )
}
function ReorderImage() {
    return <img draggable="false" src="/images/icons/reorder.svg" className="h-full object-contain select-none" />
}

function EditLinksButton ({ handleStartInput }: EditLinksButtonProps) {
    return <button onClick={handleStartInput} className="profileButton">Edit</button>
}

function RemoveLinksButton({ handleStartRemove }: RemoveLinksButtonProps) {
    return <button onClick={handleStartRemove} className="profileButton text-red-500 hover:bg-red-100">- Remove Links</button>
}

function AddLinkButton({ handleStartAdd }: AddLinkButtonProps) {
    return <button onClick={handleStartAdd} className="profileButton">+ Add Link</button>
}

function ProfileLinksContentRemove({ links }: ProfileLinksContentRemoveProps) {
    const dispatch = useAppDispatch()
    
    const handleRemoveLink = (linkId: number) => {  
        // remove link from global state
        dispatch(removeProfileLink(linkId))
    }
    
    return (
        <div className="grid grid-cols-1 gap-y-3">
            {
                links.map((link, k) => {
                    return <ProfileLinkRemove  key={k} handleRemoveLink={handleRemoveLink} link={link} linkId={k} />
                })
            }
        </div>
    )
}
function ProfileLinkRemove({ handleRemoveLink, link, linkId}: ProfileLinkRemoveProps) {
    return (
        <div className="relative flex justify-between">
            <ProfileLink link={link} />
            <RemoveLinkButton handleRemoveLink={handleRemoveLink} linkId={linkId} />
        </div>
    )
}
function RemoveLinkButton ({ handleRemoveLink, linkId }: RemoveLinkButtonProps) {
    return (
        <div onClick={() => handleRemoveLink(linkId)} className="relative h-full p-[5px] rounded-xl overflow-hidden cursor-pointer hover:bg-red-100">
            <RemoveLinkButtonImage />
        </div>
    )
}
function RemoveLinkButtonImage() {
    return <img src="/images/icons/trash.svg" className="h-full object-contain" />
}

function AddLinkForm({ addLinkFormRef, handleEndAdd }: AddLinkFormProps) {
    const dispatch = useAppDispatch()
    const linkTypeRef = useRef<HTMLSelectElement>()
    const linkLocationRef = useRef<HTMLInputElement>()
    const linkDisplayRef = useRef<HTMLInputElement>()

    useEffect(() => {
        linkTypeRef.current.value = "none"
    }, [])

    const handleChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
        const linkTypeId = e.target.value

        // find link type with link type id
        const linkType = linkTypes.find((e) => e.id == linkTypeId);

        // change value to location and display to link type
        linkLocationRef.current.value = linkType.location
        linkDisplayRef.current.value = linkType.display
    }

    const handleAddLink = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        // get form values
        const linkTypeId = linkTypeRef.current.value
        const location = linkLocationRef.current.value
        const display = linkDisplayRef.current.value

        // find link type with link type id
        const linkType = linkTypes.find((e) => e.id == linkTypeId)
        
        // get logo path
        const logo = linkType.logo || ""

        // add link to global state
        dispatch(addProfileLink({ location, display, logo}))

        // end add mode
        handleEndAdd()
    }

    return (
        <form ref={addLinkFormRef} onSubmit={handleAddLink} className="grid grid-cols-1 gap-y-2">
            <LinkType handleChangeType={handleChangeType} linkTypeRef={linkTypeRef} />
            <LinkLocation linkLocationRef={linkLocationRef} />
            <LinkDisplay linkDisplayRef={linkDisplayRef} />
            <LinkAddOptions handleEndAdd={handleEndAdd} />
        </form>
    )
}
function LinkType({ handleChangeType, linkTypeRef }: LinkTypeProps) {
    return (
        <div className="w-full flex justify-between items-center">
            <LinkTypeTitle />
            <LinkTypeSelect handleChangeType={handleChangeType} linkTypeRef={linkTypeRef} />
        </div>
    )
}
function LinkTypeTitle() {
    return <h1>Type</h1>
}
function LinkTypeSelect({ handleChangeType, linkTypeRef }: LinkTypeSelectProps) {
    return (
        <select required ref={linkTypeRef} onChange={handleChangeType} className="w-[226px] h-[40px] px-[5px] rounded-xl overflow-hidden border-2" >
            <option value="none" disabled >Choose Type</option>
            {
                linkTypes.map((linkType, k) => <LinkTypeOption linkTypeId={linkType.id} label={linkType.label} key={k} />)
            }
        </select>   
    )
}
function LinkTypeOption({ linkTypeId, label}: LinkTypeOptionProps) {
    return <option value={linkTypeId}>{label}</option>
}
function LinkLocation({ linkLocationRef }: LinkLocationProps) {
    return (
        <div className="w-full flex justify-between items-center">
            <LinkLocationTitle />
            <LinkLocationInput linkLocationRef={linkLocationRef} />
        </div>
    )
}
function LinkLocationTitle() {
    return <h1>Location</h1>
}
function LinkLocationInput({ linkLocationRef }: LinkLocationInputProps) {
    return <input required ref={linkLocationRef} type="text" placeholder="https://website.com" className="w-[226px] h-[40px] px-[5px] rounded-xl overflow-hidden border-2" />
}
function LinkDisplay({ linkDisplayRef }: LinkDisplayProps) {
    return (
        <div className="w-full flex justify-between items-center">
            <LinkDisplayTitle />
            <LinkDisplayInput linkDisplayRef={linkDisplayRef} />
        </div>
    )
}
function LinkDisplayTitle() {
    return <h1>Display</h1>
}
function LinkDisplayInput({ linkDisplayRef }: LinkDisplayInputProps) {
    return <input required ref={linkDisplayRef} type="text" placeholder="username" className="w-[226px] h-[40px] px-[5px] rounded-xl overflow-hidden border-2" />
}
function LinkAddOptions({ handleEndAdd }: LinkAddOptionsProps) {
    return (
        <div className="grid grid-cols-2" >
            <LinkCancelButton handleEnd={handleEndAdd} />
            <LinkAddButton />
        </div>
    )
}
function LinkCancelButton({ handleEnd }: LinkCancelButtonProps) {
    return <button onClick={handleEnd} className="profileButton text-gray-500 hover:bg-gray-100">Cancel</button>
}
function LinkCancelButtonRight({ handleEnd }: LinkCancelButtonRightProps) {
    return <button onClick={handleEnd} className="profileButton text-gray-500 justify-self-end hover:bg-gray-100">Cancel</button>
}

function LinkAddButton() {
    return <button type="submit" className="profileButton">Add</button>
}