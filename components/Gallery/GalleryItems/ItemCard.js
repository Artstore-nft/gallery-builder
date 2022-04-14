import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { showItem, hideItem, selectHiddenItems, selectPinnedItems, pinItem, unpinItem } from '../../../features/items/itemsSlice'
import { selectPreviewMode } from '../../../features/settings/settingsSlice'

export default function ItemCard ({ item }) {
    return (
        <div className="bg-[white] w-full rounded-lg overflow-hidden shadow-md transition ease-in-out hover:shadow-xl hover:-translate-y-1">
            <ImageContainer id={item.id} image={item.image} />
            <Info item={item} />
        </div>
    )
}

function ImageContainer({ id, image }) {
    const [showVideo, setShowVideo] = useState(false)
    const [displaySource, setdisplaySource] = useState("")

    useEffect(() => { 
        // if image type is video, show video 
        image.type == 'video' ? setShowVideo(true) : setShowVideo(false)

        // if image source exists, display source
        image.source && setdisplaySource(image.source)
    })
    return (
        <Link href={`/item/${encodeURIComponent(id.address)}/${encodeURIComponent(id.id)}`}>
            <div className="relative container aspect-[1/1] overflow-hidden cursor-pointer">
                { showVideo ? <ItemCardVideo source={displaySource} /> : <ItemCardImage source={displaySource} /> }
            </div>
        </Link>
    )
}
function ItemCardVideo({ source }) {
    return <video src={source} autoPlay loop muted></video>
}

function ItemCardImage({ source}) {
    return <img src={source} layout="fill" />
}

function Info({ item }) {
    return (
        <div className="grid grid-cols-1 gap-y-[10px] w-full h-[100px] px-[20px] py-[10px]">
            <ItemCardName name={item.info.name} />
            <ItemSubheader id={item.id} collection={item.info.collection} />
        </div>
    )
}
function ItemCardName({ name }) {
    return <h1 className="text-3xl font-semibold">{name}</h1>
}

function ItemSubheader({ id, collection }) {
    const previewMode = useAppSelector(selectPreviewMode)
    const [isPreviewMode, setIsPreviewMode] = useState()

    useEffect(() => {
        setIsPreviewMode(previewMode)
    }, [previewMode])

    return (
        <div className="relative flex justify-between">
            <ItemCardCollection collection={collection} />
            {!isPreviewMode && <ItemCardOptions id={id} />}
        </div>
    )
}
function ItemCardCollection({ collection }) {
    return <h1 className="text-xl font-semibold">{collection}</h1>
}
function ItemCardOptions({ id }) {
    return (
        <div className="relative flex gap-2">
            <ItemCardPin id={id} />
            <ItemCardVisibility id={id} />
        </div>
    )
}
function ItemCardPin({ id }) {
    const dispatch = useAppDispatch()
    const pinnedItems = useAppSelector(selectPinnedItems)
    const [isPinned, setIsPinned] = useState(false)

    useEffect(() => {
        pinnedItems.includes(id) ? setIsPinned(true) : setIsPinned(false)
    }, [pinnedItems])

    const handlePinItem = () => {
        dispatch(pinItem(id))
    }
    const handleUnpinItem = () => {
        dispatch(unpinItem(id))
    }

    return (
        <div className="relative h-full py-[3px]">
            {isPinned ? <ItemCardPinFull handleUnpinItem={handleUnpinItem} /> : <ItemCardPinEmpty handlePinItem={handlePinItem} />}
        </div>
    )
}
function ItemCardPinEmpty({ handlePinItem }) {
    return <img onClick={handlePinItem} src="/images/icons/pin.svg" title="Pin item" className="h-full cursor-pointer" />
}
function ItemCardPinFull({ handleUnpinItem }) {
    return <img onClick={handleUnpinItem} src="/images/icons/pinRed.svg" title="Unpin item" className="h-full cursor-pointer" />
}

function ItemCardVisibility({ id }) {
    const dispatch = useAppDispatch()
    const hiddenItems = useAppSelector(selectHiddenItems)
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        hiddenItems.includes(id) ? setIsHidden(true) : setIsHidden(false)
    }, [hiddenItems])

    const handleHideItem = () => {
        dispatch(hideItem(id))
    }
    const handleShowItem = () => {
        dispatch(showItem(id))
    }

    return (
        <div className="relative h-full">
            {isHidden ? <ItemCardVisibilityHidden handleShowItem={handleShowItem} /> : <ItemCardVisibilityShown handleHideItem={handleHideItem} />}
        </div>
    )
}
function ItemCardVisibilityShown({ handleHideItem }) {
    return <img onClick={handleHideItem} src="/images/icons/show.svg" title="Hide item" className="h-full cursor-pointer" />
}
function ItemCardVisibilityHidden({ handleShowItem }) {
    return <img onClick={handleShowItem} src="/images/icons/hide.svg" title="Show item" className="h-full cursor-pointer" />
}
