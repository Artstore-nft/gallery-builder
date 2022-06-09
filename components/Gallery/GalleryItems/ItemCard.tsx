import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'

import { showItem, hideItem, selectHiddenItems, selectPinnedItems, pinItem, unpinItem, ItemType, ItemId, ItemImage } from '../../../features/items/itemsSlice'
import { selectPreviewMode } from '../../../features/settings/settingsSlice'

type ItemCardProps = {
    item: ItemType
}

type ImageContainerProps = {
    id: ItemId
    image: ItemImage
}

type ItemCardVideoProps = {
    source: string
}

type ItemCardImageProps = {
    source: string
}

type ItemCardNameProps = {
    name: string
}

type InfoProps = {
    item: ItemType
}

type ItemSubheaderProps = {
    id: ItemId
    collection: string
}

type ItemCardCollectionProps = {
    collection: string
}

type ItemCardOptionsProps = {
    id: ItemId
}

type ItemCardPinProps = {
    id: ItemId   
}

type ItemCardPinEmptyProps = {
    handlePinItem: () => void
}

type ItemCardVisibilityProps = {
    id: ItemId
}

type ItemCardVisibilityShownProps = {
    handleHideItem: () => void
}

type ItemCardVisibilityHiddenProps = {
    handleShowItem: () => void
}

export default function ItemCard ({ item }: ItemCardProps) {
    return (
        <div className="bg-[white] w-full rounded-lg overflow-hidden shadow-md transition ease-in-out hover:shadow-xl hover:-translate-y-1">
            <ImageContainer id={item.id} image={item.image} />
            <Info item={item} />
        </div>
    )
}

function ImageContainer({ id, image }: ImageContainerProps) {
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
function ItemCardVideo({ source }: ItemCardVideoProps) {
    return <video src={source} autoPlay loop muted></video>
}

function ItemCardImage({ source }: ItemCardImageProps) {
    return <img className="w-full" src={source} />
}

function Info({ item }: InfoProps) {
    return (
        <div className="grid grid-cols-1 gap-y-[10px] w-full h-[100px] px-[20px] py-[10px]">
            <ItemCardName name={item.info.name} />
            <ItemSubheader id={item.id} collection={item.info.collection} />
        </div>
    )
}
function ItemCardName({ name }: ItemCardNameProps) {
    return <h1 className="text-3xl font-semibold">{name}</h1>
}

function ItemSubheader({ id, collection }: ItemSubheaderProps) {
    const previewMode: boolean = useAppSelector(selectPreviewMode)
    const [isPreviewMode, setIsPreviewMode] = useState(false)

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
function ItemCardCollection({ collection }: ItemCardCollectionProps) {
    return <h1 className="text-xl font-semibold">{collection}</h1>
}
function ItemCardOptions({ id }: ItemCardOptionsProps) {
    return (
        <div className="relative flex gap-2">
            <ItemCardPin id={id} />
            <ItemCardVisibility id={id} />
        </div>
    )
}
function ItemCardPin({ id }: ItemCardPinProps) {
    const dispatch = useAppDispatch()
    const pinnedItems: ItemId[] = useAppSelector(selectPinnedItems)
    const stringPinnedItems = pinnedItems.map(itemId => JSON.stringify(itemId))
    const [isPinned, setIsPinned] = useState(false)

    useEffect(() => {
        stringPinnedItems.includes(JSON.stringify(id)) ? setIsPinned(true) : setIsPinned(false)
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
function ItemCardPinEmpty({ handlePinItem }: ItemCardPinEmptyProps) {
    return <img onClick={handlePinItem} src="/images/icons/pin.svg" title="Pin item" className="h-full cursor-pointer" />
}
function ItemCardPinFull({ handleUnpinItem }) {
    return <img onClick={handleUnpinItem} src="/images/icons/pinRed.svg" title="Unpin item" className="h-full cursor-pointer" />
}

function ItemCardVisibility({ id }: ItemCardVisibilityProps) {
    const dispatch = useAppDispatch()
    const hiddenItems: ItemId[] = useAppSelector(selectHiddenItems)
    const stringHiddenItems = hiddenItems.map(itemId => JSON.stringify(itemId))
    const [isHidden, setIsHidden] = useState(false)

    useEffect(() => {
        stringHiddenItems.includes(JSON.stringify(id)) ? setIsHidden(true) : setIsHidden(false)
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
function ItemCardVisibilityShown({ handleHideItem }: ItemCardVisibilityShownProps) {
    return <img onClick={handleHideItem} src="/images/icons/show.svg" title="Hide item" className="h-full cursor-pointer" />
}
function ItemCardVisibilityHidden({ handleShowItem }: ItemCardVisibilityHiddenProps) {
    return <img onClick={handleShowItem} src="/images/icons/hide.svg" title="Show item" className="h-full cursor-pointer" />
}
