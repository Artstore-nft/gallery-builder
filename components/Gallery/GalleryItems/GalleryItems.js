import sortItems from '../../../library/items/sortItems'

import { useState, useEffect, useRef } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { useAppSelector } from '../../../app/hooks'

import {
    setItemsOrder, selectItems, selectHiddenItems, selectItemsOrder, selectPinnedItems
} from '../../../features/items/itemsSlice'
import {
    selectPreviewMode
} from '../../../features/settings/settingsSlice'
 

// import components
import ItemCard from './ItemCard'

export default function GalleryItems() {
    const previewMode = useAppSelector(selectPreviewMode)
    const [showPreviewMode, setPreviewMode] = useState(false)

    useEffect(() => {
        // show preview mode status
        setPreviewMode(previewMode)
    })

    return showPreviewMode ? <GalleryItemsPreview /> : <GalleryItemsEdit />
}
function GalleryItemsPreview() {
    return (
        <div className="float-left w-[75%] pr-[30px]">
            <GalleryItemsHeaderPreview />
            <ItemCardsCollection />
        </div>
    )
}

function GalleryItemsHeaderPreview() {
    return (
        <div className="relative border-b-2 mb-[15px]">
            <GalleryItemsHeaderCollection />
        </div>
    )
}

function GalleryItemsEdit() {
    const [hiddenMode, setHiddenMode] = useState(false)

    const handleStartHidden = () => {
        setHiddenMode(true)
    }
    const handleEndHidden = () => {
        setHiddenMode(false)
    }

    return (
        <div className="float-left w-[75%] pr-[30px]">
            <GalleryItemsHeaderEdit handleStartHidden={handleStartHidden} handleEndHidden={handleEndHidden} hiddenMode={hiddenMode} />
            {hiddenMode ? <ItemCardsHidden/> : <ItemCardsCollection />}
        </div>
    )
}

function GalleryItemsHeaderEdit({ handleStartHidden, handleEndHidden, hiddenMode }) {
    return <div className="relative flex justify-between border-b-2 mb-[15px]">
        <GalleryItemsHeaderLeft handleStartHidden={handleStartHidden} handleEndHidden={handleEndHidden} hiddenMode={hiddenMode} />
        <GalleryItemsHeaderSort />
    </div>
}
function GalleryItemsHeaderLeft({ handleStartHidden, handleEndHidden, hiddenMode }) {
    const hiddenItems = useAppSelector(selectHiddenItems)
    const headerCollectionRef = useRef()
    const headerHiddenRef = useRef()
    const [hiddenItemsExist, setHiddenItemsExist] = useState(false)

    useEffect(() => {
        if (hiddenItems.length) { 
            setHiddenItemsExist(true)
        } else {
            setHiddenItemsExist(false)
            handleEndHidden()
        } 

    }, [hiddenItems])

    useEffect(() => {
        if(hiddenMode) {
            if(headerCollectionRef.current) {
                headerCollectionRef.current.style.color = "rgb(156 163 175)" 
            } 
            if(headerHiddenRef.current) {
                headerHiddenRef.current.style.color = "black" 
            }
        } else {
            if(headerCollectionRef.current) {
                headerCollectionRef.current.style.color = "black" 
            } 
            if(headerHiddenRef.current) {
                headerHiddenRef.current.style.color = "rgb(156 163 175)" 
            }
        }
    }, [hiddenMode])

    return (
        <div className="flex gap-2">
            <GalleryItemsHeaderCollection headerCollectionRef={headerCollectionRef} handleEndHidden={handleEndHidden} />
            {hiddenItemsExist && <GalleryItemsHeaderHidden headerHiddenRef={headerHiddenRef} handleStartHidden={handleStartHidden} />}
        </div>
    )
}

function GalleryItemsHeaderCollection({ headerCollectionRef, handleEndHidden }) {
    return <h1 ref={headerCollectionRef} onClick={handleEndHidden} className="text-left text-2xl font-semibold mb-[5px] cursor-pointer">Collection</h1>
}
function GalleryItemsHeaderHidden({ headerHiddenRef, handleStartHidden }) {
    return <h1 ref={headerHiddenRef} onClick={handleStartHidden} className="text-left text-2xl font-semibold text-gray-400 mb-[5px] cursor-pointer">Hidden</h1>
}

function GalleryItemsHeaderSort() {
    const dispatch = useAppDispatch()
    const itemsOrder = useAppSelector(selectItemsOrder)
    const sortSelectRef = useRef()

    useEffect(() => {
        if (sortSelectRef.current) {
            sortSelectRef.current.value = itemsOrder
        }
    }, [])

    const handleChangeOrder = (e) => {
        dispatch(setItemsOrder(e.target.value))
    }

    return (
        <div className="relative flex align-center items-center gap-2">
            <GalleryItemsHeaderSortLabel />
            <GalleryItemsHeaderSortSelect sortSelectRef={sortSelectRef} handleChangeOrder={handleChangeOrder} />
        </div>
    )
}
function GalleryItemsHeaderSortLabel() {
    return <h1 className="">Sort:</h1>
}
function GalleryItemsHeaderSortSelect({ sortSelectRef, handleChangeOrder }) {
    return (
        <select ref={sortSelectRef} onChange={handleChangeOrder} className="h-[30px] min-w-[50px] px-[5px] rounded-lg overflow-hidden border-2">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
        </select>
    )
}

function ItemCardsCollection () {
    const items = useAppSelector(selectItems)
    const hiddenItems = useAppSelector(selectHiddenItems)
    const pinnedItems = useAppSelector(selectPinnedItems)
    const itemsOrder = useAppSelector(selectItemsOrder)
    const [displayItems, setDisplayItems] = useState([])
    
    // refresh display items on item changes
    useEffect(() => {
        setDisplayItems(items)
    }, [items])

    // filter out hidden items and pinned items, then create an item card for each remaining item
    const itemCards = displayItems
    .filter(item => !hiddenItems.includes(item.id) && !pinnedItems.includes(item.id))
    .map((item, key) => {
        return <ItemCard item={item} key={key} />
    }) 

    // sort items based on items order
    const sortedItems = sortItems(itemCards, itemsOrder)

    // filter out hidden items, then create an item card for each pinned item
    const pinnedItemCards = pinnedItems
    .filter(itemId => !hiddenItems.includes(itemId))
    .map((itemId, key) => {
        const pinnedItem = items.find(item => JSON.stringify(item.id) == JSON.stringify(itemId))
        return <ItemCard item={pinnedItem} key={key} />
    })
    
    return (
        <div className="relative grid grid-cols-2 gap-x-[2.5%] gap-y-[30px]">
            {pinnedItemCards}
            {sortedItems}
        </div>
    )
}

function ItemCardsHidden () {
    const items = useAppSelector(selectItems)
    const hiddenItems = useAppSelector(selectHiddenItems)
    const itemsOrder = useAppSelector(selectItemsOrder)
    const [displayItems, setDisplayItems] = useState([])
    
    // refresh display items on item changes
    useEffect(() => {
        setDisplayItems(items)
    }, [items])

    // filter out non-hidden items, then create an item card for each item
    const itemCards = displayItems
        .filter(item => hiddenItems.includes(item.id))
        .map((item, key) => {
            return <ItemCard item={item} key={key} />
        }) 

    // sort items based on items order
    const sortedItems = sortItems(itemCards, itemsOrder)

    return (
        <div className="relative grid grid-cols-2 gap-x-[2.5%] gap-y-[30px]">
            {sortedItems}
        </div>
    )
}