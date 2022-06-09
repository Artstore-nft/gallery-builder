// import hooks
import { FormEvent, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { ProfileType } from "../../../features/settings/settingsSlice"

// import features
import {
    setProfileBio
} from "../../../features/settings/settingsSlice"

import { ProfileContext } from './Profile'

type ProfileBioPreviewProps = {
    bio: string
}

type ProfileBioContentProps = {
    bio: string
}

type ProfileBioMissingProps = {
    handleStartInput: () => void
}

type AddBioButtonProps = {
    handleStartInput: () => void
}

type ProfileBioEditProps = {
    bio: string
}

type ProfileBioNoInputProps = {
    handleStartInput: () => void
    bio: string
}

type ProfileBioInputProps = {
    profileBioFormRef: MutableRefObject<HTMLFormElement>
    handleEndInput: () => void
    bio: string
}

type ProfileBioOptionsProps = {
    handleEndInput: () => void
}

type ProfileBioInputBoxProps = {
    profileBioInputRef: MutableRefObject<HTMLTextAreaElement>
    bio: string
}

type ProfileBioEditButtonProps = {
    handleEdit: () => void
}

type ProfileBioCancelProps = {
    handleEndInput: () => void
}

export default function ProfileBio() {
    const { profile: { bio }, previewMode } = useContext(ProfileContext) || null

    // If preview mode is on show bio, else show bio form
    if (previewMode) {
        // if bio exists show bio, else show nothing
        return bio ? <ProfileBioPreview bio={bio} /> : null
    } else {
        // if input mode is on or bio exists show bio form, else show add bio prompt
        return <ProfileBioEdit bio={bio} />
    }
}

function ProfileBioPreview({ bio }: ProfileBioPreviewProps) {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileBioTitle />
            <ProfileBioContent bio={bio} />
        </div>
    )
}
function ProfileBioTitle() {
    return <h1 className="text-left text-xl font-semibold border-b-[1px] mb-2">Bio</h1>
}
function ProfileBioContent({ bio }: ProfileBioContentProps) {
    return <p className="profileBioContent">{bio}</p>
}

function ProfileBioMissing({ handleStartInput }: ProfileBioMissingProps) {
    return (
        <div className="profileMissing">
            <AddBioButton handleStartInput={handleStartInput} />
        </div>
    )
}
function AddBioButton({ handleStartInput }: AddBioButtonProps) {
    return <button onClick={handleStartInput} className="profileButton">+ Add Bio</button>
}

function ProfileBioEdit({ bio }: ProfileBioEditProps) {
    const profileBioFormRef = useRef<HTMLFormElement>()
    const [inputMode, setInputMode] = useState(false)

    const handleStartInput = () => {
        // set input mode true
        setInputMode(true)

        // start listening for clicks outside of input
        document.addEventListener("mousedown", handleClickOutside)
    }

    const handleEndInput = () => {
        // set input mode false
        setInputMode(false)

        // stop listening for clicks outside of input
        document.removeEventListener("mousedown", handleClickOutside)
    }

    const handleClickOutside = (e) => {
        // end input mode
        profileBioFormRef.current && !profileBioFormRef.current.contains(e.target) && handleEndInput()
    }


    if(inputMode) {
        return <ProfileBioInput profileBioFormRef={profileBioFormRef} handleEndInput={handleEndInput} bio={bio} />
    } else {
        return bio ? <ProfileBioNoInput handleStartInput={handleStartInput} bio={bio} /> : <ProfileBioMissing handleStartInput={handleStartInput} />
    }
}

function ProfileBioNoInput({ handleStartInput, bio }: ProfileBioNoInputProps) {
    return (
        <div className="grid grid-cols-1">
            <ProfileBioTitle />
            <ProfileBioContent bio={bio} />
            <ProfileBioEditButton handleEdit={handleStartInput} />
        </div>
    )
}

function ProfileBioInput({ profileBioFormRef, handleEndInput, bio }: ProfileBioInputProps) {
    const dispatch = useAppDispatch()
    const profileBioInputRef = useRef<HTMLTextAreaElement>()

    useEffect(() => {
        // if input mode is on and input exists, focus input
        profileBioInputRef.current && profileBioInputRef.current.focus()
    })

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault()

        // set profile bio as current input value, then end input mode
        dispatch(setProfileBio(profileBioInputRef.current.value))
        handleEndInput()
    }

    return(
        <form ref={profileBioFormRef} onSubmit={handleFormSubmit} className="relative grid grid-cols-1 gap-y-2">
            <ProfileBioTitle />
            <ProfileBioInputBox profileBioInputRef={profileBioInputRef} bio={bio} />
            <ProfileBioOptions handleEndInput={handleEndInput} />
        </form>
    )
}

function ProfileBioInputBox({ profileBioInputRef, bio}: ProfileBioInputBoxProps) {
    return <textarea placeholder="Bio" ref={profileBioInputRef} defaultValue={bio} className="profileBioInput" ></textarea>
}

function ProfileBioOptions({ handleEndInput }: ProfileBioOptionsProps) {
    return (
        <div className="grid grid-cols-2">
            <ProfileBioCancel handleEndInput={handleEndInput} />  
            <ProfileBioAdd /> 
        </div>
    )
}

function ProfileBioEditButton({ handleEdit }: ProfileBioEditButtonProps) {
    return <button onClick={handleEdit} className="profileButton">Edit</button>
}

function ProfileBioCancel({ handleEndInput }: ProfileBioCancelProps) {
    return <button type="button" onClick={handleEndInput} className="profileButton text-gray-500 hover:bg-gray-100">Cancel</button>
}
function ProfileBioAdd() {
    return <button type="submit" className="profileButton">Add</button>
}