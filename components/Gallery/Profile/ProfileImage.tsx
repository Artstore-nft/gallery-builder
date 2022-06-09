// import hooks
import { ChangeEvent, ChangeEventHandler, MutableRefObject } from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../app/hooks"

// import features
import {    
    setProfileImage,
    removeProfileImage,
    selectGithub,
    Github
} from "../../../features/settings/settingsSlice"

import { ProfileContext } from './Profile'

type ProfileImagePreviewProps = {
    image: string
}

type ProfileImageBoxProps = {
    image: string
}

type ImageProps = {
    image: string
}

type ProfileImageEditProps = {
    image: string
}

type ProfileImageMissingProps = {
    handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void
}

type AddImageButtonProps = {
    handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void    
}

type AddImageButtonLabelProps = {
    handleClickInput: () => void
}

type ProfileImageNoInputProps = {
    handleStartInput: () => void
    image: string
}

type EditImageButtonProps = {
    handleStartInput: () => void
}

type ProfileImageInputProps = {
    profileImageFormRef: MutableRefObject<HTMLDivElement>
    handleEndInput: () => void
    handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void
    handleRemoveImage: () => void
    image: string
}

type ProfileImageOptionsProps = {
    handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void
    handleRemoveImage: () => void
}

type RemoveImageButtonProps = {
    handleRemoveImage: () => void
}

type ImageAddButtonProps = {
    handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void
}

type ImageAddButtonInputProps = {
    imageAddButtonInputRef: MutableRefObject<HTMLInputElement>
    handleAddImage: (e: ChangeEvent<HTMLInputElement>) => void
}

type ImageAddButtonLabelProps = {
    handleClickInput: () => void
}

export default function ProfileImage() {
    const github: Github = useAppSelector(selectGithub)
    const { profile: { image }, previewMode } = useContext(ProfileContext) || null
    let imageSource: string

    if (image) {
        const username = github.session.user.name
        const repo = github.repo
        imageSource = `https://raw.githubusercontent.com/${username}/${repo}/main/public/images/${image}`
    } else {
        imageSource = null
    }

    // If preview mode is on show image, else show image form
    if (previewMode) {
        // if image exists show image, else show nothing
        return imageSource ? <ProfileImagePreview image={imageSource} /> : null
    } else {
        // if input mode is on or image exists show image form, else show add image prompt
        return <ProfileImageEdit image={imageSource} />
    }
}

function ProfileImagePreview({ image }: ProfileImagePreviewProps) {
    return(
        <div className="container px-[16%]">
            <ProfileImageBox image={image} />
        </div>
    )
}
function ProfileImageBox({ image }: ProfileImageBoxProps) {
    return (
        <div className="relative min-w-[100px] aspect-[1/1] rounded-full  overflow-hidden">
            <Image image={image} />
        </div>
    )
}
function Image({ image }: ImageProps) {
    return <img src={image} className="w-fit" />
}

function ProfileImageEdit({ image }: ProfileImageEditProps) {
    const dispatch = useAppDispatch()
    const github: Github = useAppSelector(selectGithub)
    const profileImageFormRef = useRef<HTMLDivElement>()
    const [inputMode, setInputMode] = useState(false)
    const [addGalleryError, setAddGalleryError] = useState(false)

    useEffect(() => {
        setAddGalleryError(false)
    }, [github])

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

    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (github.repo) {
            dispatch(setProfileImage(e.target.files[0]))    
        } else {
            setAddGalleryError(true)
        }
    }
    const handleRemoveImage = () => {
        dispatch(removeProfileImage(undefined))
        handleEndInput()
    }

    return (
        <div>
            {
                (() => {
                    if(inputMode) {
                        return <ProfileImageInput profileImageFormRef={profileImageFormRef} handleEndInput={handleEndInput} handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage} image={image} />
                    } else {
                        return image ? <ProfileImageNoInput handleStartInput={handleStartInput} image={image} /> : <ProfileImageMissing handleAddImage={handleAddImage} />
                    }
                })()
            }
            {addGalleryError && <h1 className="text-sm text-center text-red-500">Add gallery to Github to upload image</h1>}
        </div>
    )
}

function ProfileImageMissing({ handleAddImage }: ProfileImageMissingProps) {
    return (
        <div className="container px-[16%]">
            <AddImageButton handleAddImage={handleAddImage} />
        </div>
    )
}
function AddImageButton({ handleAddImage }: AddImageButtonProps) {
    const imageAddButtonInputRef = useRef<HTMLInputElement>()

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
function AddImageButtonLabel({ handleClickInput }: AddImageButtonLabelProps) {
    return <button type="button" onClick={handleClickInput} className="w-full h-full">+ Add Image</button>   
}

function ProfileImageNoInput({ handleStartInput, image }: ProfileImageNoInputProps) {
    return (
        <div className="grid grid-cols-1 gap-y-2">
            <ProfileImagePreview image={image} />
            <EditImageButton handleStartInput={handleStartInput} />
        </div>
    )
}
function EditImageButton ({ handleStartInput }: EditImageButtonProps) {
    return <button onClick={handleStartInput} className="profileButton">Edit</button>
}

function ProfileImageInput({ profileImageFormRef, handleEndInput, handleAddImage, handleRemoveImage, image }: ProfileImageInputProps) {
    return (
        <div ref={profileImageFormRef} className="grid grid-cols-1">
            <ImageCancelButtonRight handleEnd={handleEndInput} />
            <ProfileImagePreview image={image} />
            <ProfileImageOptions handleAddImage={handleAddImage} handleRemoveImage={handleRemoveImage} />
        </div>
    )
}

function ProfileImageOptions({ handleAddImage, handleRemoveImage }: ProfileImageOptionsProps) {
    return (
        <div className="grid grid-cols-2" >
            <RemoveImageButton handleRemoveImage={handleRemoveImage} />
            <ImageAddButton handleAddImage={handleAddImage} />
        </div>
    )
}
function RemoveImageButton({ handleRemoveImage }: RemoveImageButtonProps) {
    return <button type="button" onClick={handleRemoveImage} className="profileButton text-red-500 hover:bg-red-100">Remove Image</button>
}
function ImageCancelButtonRight({ handleEnd }) {
    return <button type="button" onClick={handleEnd} className="profileButton text-gray-500 justify-self-end hover:bg-gray-100">Cancel</button>
}

function ImageAddButton({ handleAddImage }: ImageAddButtonProps) {
    const imageAddButtonInputRef = useRef<HTMLInputElement>()

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
function ImageAddButtonInput({ imageAddButtonInputRef, handleAddImage }: ImageAddButtonInputProps) {
    return <input ref={imageAddButtonInputRef} type="file" accept="image/*" onChange={handleAddImage} className="hidden" />
}
function ImageAddButtonLabel({ handleClickInput }: ImageAddButtonLabelProps) {
    return <button type="button" onClick={handleClickInput} className="profileButton">Change</button> 
}