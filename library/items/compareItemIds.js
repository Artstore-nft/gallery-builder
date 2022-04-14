export default function compareItemIds(firstItem, secondItem) {
    // if id and address are the same, return true, else return false
    return (firstItem.id == secondItem.id) && (firstItem.address == secondItem.address)
}