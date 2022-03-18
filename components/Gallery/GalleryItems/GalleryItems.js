import useSWR from 'swr'

import { useAppSelector } from '../../../app/hooks'
import fetch from '../../../library/api/fetch'

import {
    selectItems,
} from '../../../features/items/itemsSlice'
import {
    selectWalletAddress,
} from '../../../features/settings/settingsSlice'

// import components
import ItemCard from './ItemCard'

export default function GalleryItems() {
    const walletAddress = useAppSelector(selectWalletAddress)
    const items = useAppSelector(selectItems)

    console.log(items)

    return (
        <div className="float-left w-[75%] pr-[30px]">
            <GalleryItemsHeader />
            <ItemCardsContainer items={items} />
        </div>
    )
}

function GalleryItemsHeader() {
    return <div className="relative border-b-2 mb-[15px]">
        <GalleryItemsHeaderTitle />
    </div>
}
function GalleryItemsHeaderTitle() {
    return <h1 className="text-left text-2xl font-semibold mb-[5px]">Collection</h1>
}

function ItemCardsContainer ({ items }) {
    return (
        <div className="relative grid grid-cols-2 gap-x-[2.5%] gap-y-[30px]">
            {
                items.map((item, key) => {
                    return <ItemCard item={item} key={key} />
                })
            }
        </div>
    )
}
