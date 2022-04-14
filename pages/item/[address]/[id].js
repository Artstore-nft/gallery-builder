import { useRouter } from 'next/router'

// import hooks
import { useEffect, useState } from 'react'
import { useAppSelector } from "../../../app/hooks"
import { selectItems } from "../../../features/items/itemsSlice"

// import components
import Item from "../../../components/Gallery/Item/Item" 
import Editor from '../../../components/Editor/Editor'

export default function ItemPage() {
    const router = useRouter()
    const itemId = router.query
    const items = useAppSelector(selectItems)
    const [showItem, setShowItem] = useState(false)
    const [displayItemInfo, setItemInfo] = useState(null)

    useEffect(() => {
        if(items) {
            setItemInfo(getItem(items, itemId))
            setShowItem(true)
        }
    })
    
    return (
            <Item item={displayItemInfo} /> 
    )
}

function getItem(items, { address, id }) {
    const item = items.filter((item) => {
        if ((item.id.address == address) && (item.id.id == id)) {
            return true
        }
    })[0]

    return item
}
