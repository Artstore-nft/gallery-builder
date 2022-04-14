export default function sortItems(items, method) {
    switch (method) {
        case "newest":
            return items
        case "oldest":
            return [...items].reverse() 
    }
}