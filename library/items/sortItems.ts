import { ItemType } from "../../features/items/itemsSlice"

export default function sortItems(items: JSX.Element[], method: "newest" | "oldest"): JSX.Element[] {
    switch (method) {
        case "newest":
            return items
        case "oldest":
            return [...items].reverse() 
    }
}