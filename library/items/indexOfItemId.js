import compareItemIds from "./compareItemIds";

export default function indexOfItemId(items, id) {
    items.map((item, i) => {
        if (compareItemIds(item, id)) {
            return i
        }
    })
    
}