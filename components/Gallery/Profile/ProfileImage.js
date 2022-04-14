// import hooks
import { useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from "../../../app/hooks"

// import features
import {    
    setProfileImage,
    removeProfileImage
} from "../../../features/settings/settingsSlice"

import { ProfileContext } from './Profile'

export default function ProfileImage() {
    const { profile, previewMode } = useContext(ProfileContext) || null
    const image = profile.image

    // If preview mode is on show image, else show image form
    if (previewMode) {
        // if image exists show image, else show nothing
        return image ? <ProfileImagePreview image={image} /> : null
    } else {
        // if input mode is on or image exists show image form, else show add image prompt
        return <ProfileImageEdit image={image} />
    }
}

function ProfileImagePreview({ image }) {
    return(
        <div className="container px-[16%]">
            <ProfileImageBox image={image} />
        </div>
    )
}
function ProfileImageBox({ image }) {
    return (
        <div className="relative min-w-[100px] aspect-[1/1] rounded-full  overflow-hidden">
            <Image image={image} />
        </div>
    )
}
function Image({ image }) {
    console.log(image)
    return <img src={image} layout="fill" />
}

function ProfileImageEdit({ image }) {
    const dispatch = useAppDispatch()
    const profileImageFormRef = useRef()
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
        profileImageFormRef.current && !profileImageFormRef.current.contains(e.target) && handleEndInput()
    }

    const handleAddImage = (e) => {
        const image = window.URL.createObjectURL(e.target.files[0])
        dispatch(setProfileImage(image))
    }
    const handleRemoveImage = () => {
        dispatch(removeProfileImage())
        handleEndInput()
    }

    if(inputMode) {
        return <ProfileImageInput profileImageFormRef={profileImageFormRef} handleEndInput={handleEndInput} handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage} image={image} />
    } else {
        return image ? <ProfileImageNoInput handleStartInput={handleStartInput} image={image} /> : <ProfileImageMissing handleAddImage={handleAddImage} />
    }
}

function ProfileImageMissing({ handleAddImage }) {
    return (
        <div className="container px-[16%]">
            <AddImageButton handleAddImage={handleAddImage} />
        </div>
    )
}
function AddImageButton({ handleAddImage }) {
    const imageAddButtonInputRef = useRef()

    const handleClickInput = () => {
        imageAddButtonInputRef.current.click()
    }

    return (
        <div className="relative w-full aspect-[1/1] bg-gray-100 rounded-full  overflow-hidden hover:bg-gray-200">
            <ImageAddButtonInput imageAddButtonInputRef={imageAddButtonInputRef} handleAddImage={handleAddImage} />
            <AddImageButtonLabel handleClickInput={handleClickInput} />
        </div>
        
    )
}
function AddImageButtonLabel({ handleClickInput }) {
    return <button type="button" onClick={handleClickInput} className="w-full h-full">+ Add Image</button>   
}

function ProfileImageNoInput({ handleStartInput, image }) {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileImagePreview image={image} />
            <EditImageButton handleStartInput={handleStartInput} />
        </div>
    )
}
function EditImageButton ({ handleStartInput }) {
    return <button onClick={handleStartInput} className="profileButton">Edit</button>
}

function ProfileImageInput({ profileImageFormRef, handleEndInput, handleAddImage, handleRemoveImage, image }) {
    return (
        <div ref={profileImageFormRef} className="grid grid-cols-1">
            <ImageCancelButtonRight handleEnd={handleEndInput} />
            <ProfileImagePreview image={image} />
            <ProfileImageOptions handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage} />
        </div>
    )
}

function ProfileImageOptions({ handleAddImage, handleRemoveImage }) {
    return (
        <div className="grid grid-cols-2" >
            <RemoveImageButton handleRemoveImage={handleRemoveImage} />
            <ImageAddButton handleAddImage={handleAddImage} />
        </div>
    )
}
function RemoveImageButton({ handleRemoveImage }) {
    return <button type="button" onClick={handleRemoveImage} className="profileButton text-red-500 hover:bg-red-100">Remove Image</button>
}
function ImageCancelButtonRight({ handleEnd }) {
    return <button type="button" onClick={handleEnd} className="profileButton text-gray-500 justify-self-end hover:bg-gray-100">Cancel</button>
}

function ImageAddButton({ handleAddImage }) {
    const imageAddButtonInputRef = useRef()

    const handleClickInput = () => {
        imageAddButtonInputRef.current.click()
    }

    return (
        <div className="grid grid-cols-1">
            <ImageAddButtonInput imageAddButtonInputRef={imageAddButtonInputRef} handleAddImage={handleAddImage} />
            <ImageAddButtonLabel handleClickInput={handleClickInput} />
        </div>
        
    )
}
function ImageAddButtonInput({ imageAddButtonInputRef, handleAddImage }) {
    return <input ref={imageAddButtonInputRef} type="file" accept="image/*" onChange={handleAddImage} className="hidden" />
}
function ImageAddButtonLabel({ handleClickInput }) {
    return <button type="button" onClick={handleClickInput} className="profileButton">Change</button> 
}