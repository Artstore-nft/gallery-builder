import { useRouter } from 'next/router'

// import hooks
import { useEffect, useState } from 'react'
import { useAppSelector } from "../../../app/hooks"
import { defaultItem, ItemId, ItemType, selectItems } from "../../../features/items/itemsSlice"

// import components
import Item from "../../../components/Gallery/Item/Item" 
import Editor from '../../../components/Editor/Editor'

export default function ItemPage() {
    const router = useRouter()
    const itemId = router.query as ItemId
    const items: ItemType[] = useAppSelector(selectItems)
    const [displayItemInfo, setItemInfo] = useState(defaultItem)

    useEffect(() => {
        items && setItemInfo(getItem(items, itemId))
    })
    
    return <Item item={displayItemInfo} /> 
}

function getItem(items: ItemType[], { address, id }: ItemId): ItemType {
    const item = items.filter((item) => {
        if ((item.id.address == address) && (item.id.id == id)) {
            return true
        }
    })[0]

    return item
}
