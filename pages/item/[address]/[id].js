import { useRouter } from 'next/router'

// import features
import { useAppSelector } from "../../../app/hooks"
import { selectItems } from "../../../features/items/itemsSlice"

// import components
import Item from "../../../components/Gallery/Item/Item" 

export default function ItemPage() {
    const items = useAppSelector(selectItems)

    const router = useRouter()
    const itemId = router.query

    const item = getItem(items, itemId)

    if (item) {
        return <Item item={item} />
    } else {
        return `Item doesn't exist`
    }
}

function getItem(items, { address, id }) {
    const item = items.filter((item) => {
        if ((item.id.address == address) && (item.id.id == id)) {
            return true
        }
    })[0]

    return item
}
