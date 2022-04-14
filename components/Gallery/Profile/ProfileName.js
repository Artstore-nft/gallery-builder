// import hooks
import { useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from "../../../app/hooks"

// import features
import {
    setProfileName
} from "../../../features/settings/settingsSlice"

import { ProfileContext } from './Profile'

export default function ProfileName() {
    const { profile, previewMode } = useContext(ProfileContext) || null
    const name = profile.name

    // If preview mode is on show name, else show name form
    if (previewMode) {
        // if name exists show name, else show nothing
        return name ? <ProfileNamePreview name={name} /> : null
    } else {
        // if input mode is on or name exists show name form, else show add name prompt
        return <ProfileNameEdit name={name} />
    }
}

function ProfileNamePreview({ name }) {
    return <h1 className="profileNameContent">{name}</h1>
}

function ProfileNameMissing({ handleStartInput }) {
    return (
        <div className="profileMissing">
            <AddNameButton handleStartInput={handleStartInput} />
        </div>
    )
}
function AddNameButton({ handleStartInput }) {
    return <button onClick={handleStartInput} className="profileButton">+ Add Name</button>
}

function ProfileNameEdit({ name }) {
    const profileNameFormRef = useRef()
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
        profileNameFormRef.current && !profileNameFormRef.current.contains(e.target) && handleEndInput()
    }

    if(inputMode) {
        return <ProfileNameInput profileNameFormRef={profileNameFormRef} handleEndInput={handleEndInput} name={name} />
    } else {
        return name ? <ProfileNameNoInput handleStartInput={handleStartInput} name={name} /> : <ProfileNameMissing handleStartInput={handleStartInput} />
    }
}

function ProfileNameNoInput({ handleStartInput, name }) {
    return (
        <div className="grid grid-cols-1">
            <ProfileNameContent name={name} />
            <ProfileNameEditButton handleEdit={handleStartInput} />
        </div>
    )
}

function ProfileNameInput({ profileNameFormRef, handleEndInput, name }) {
    const dispatch = useAppDispatch()
    const profileNameInputRef = useRef()

    useEffect(() => {
        // if input mode is on and input exists, focus input
        profileNameInputRef.current && profileNameInputRef.current.focus()
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()

        console.log('submit')

        // set profile name as current input value, then end input mode
        dispatch(setProfileName(profileNameInputRef.current.value))
        handleEndInput()
    }

    return(
        <form ref={profileNameFormRef} onSubmit={handleFormSubmit} className="relative grid grid-cols-1 gap-y-2">
            <ProfileNameInputBox profileNameInputRef={profileNameInputRef} name={name} />
            { <ProfileNameOptions handleEndInput={handleEndInput} /> }
        </form>
    )
}

function ProfileNameInputBox({profileNameInputRef, name}) {
    return <input type="text" placeholder="Name" defaultValue={name} ref={profileNameInputRef} className="profileNameInput" />
}

function ProfileNameContent({ name }) {
    return <h1 className="profileNameContent">{name}</h1>
}
function ProfileNameOptions({ handleEndInput }) {
    return (
        <div className="grid grid-cols-2">
            <ProfileNameCancel handleEnd={handleEndInput} />  
            <ProfileNameAdd />
        </div>
    )
}

function ProfileNameEditButton({ handleEdit }) {
    return <button onClick={handleEdit} className="profileButton">Edit</button>
}
function ProfileNameCancel({ handleEnd }) {
    return <button type="button" onClick={handleEnd} className="profileButton text-gray-500 hover:bg-gray-100">Cancel</button>
}

function ProfileNameAdd() {
    return <button type="submit" className="profileButton">Add</button>
}