import prepareUrl from "../../../library/api/prepareUrl"
import { ItemType, ItemId, ItemImage, ItemInfo, ItemMetadata, defaultMetadata, ItemAttribute } from "../itemsSlice"

export default async function configureItems(items: ItemType[]): Promise<ItemType[]> {
    //const newItems = items.slice(0, 60)

    // loop through all items, then configure
    return await Promise.all(items.map(async (item) => await configureItem(item) ))
}
async function configureItem(item: ItemType): Promise<ItemType> {
    // set item id
    item.id = setItemId(item)

    // set item metadata
    item.metadata = await setMetadata(item)

    // set image
    item.image = await setItemImage(item.metadata)

    // set item info
    item.info = setItemInfo(item)

    return item
}
function setItemId(item: ItemType): ItemId {
    // return item id
    return {
        address: item.token_address,
        id: item.token_id
    }
}

async function setMetadata(item: ItemType): Promise<ItemMetadata | undefined> {

    if (item.metadata) {
        return JSON.parse(item.metadata as string)
    } else {
        // if url exists, get metadata else return empty object
        return item.token_uri ? await getMetadata(item.token_uri) : defaultMetadata 
    }
} 

async function getMetadata(url: string): Promise<ItemMetadata> {
    const preparedUrl = prepareUrl(url)

    try {
        // fetch url, then return JSON response
        return await fetch(preparedUrl).then((res) => res.json())
    } catch(e) {
        return defaultMetadata
    }
}

async function setItemImage(metadata: ItemMetadata): Promise<ItemImage| undefined> {    
    if(metadata.image) {
        return {
            source: prepareUrl(metadata.image),
            type: getImageType(metadata.image)

        }
    } else if(metadata.image_url) {
        return {
            source: await getItemImage(metadata.image_url),
            type: getImageType(metadata.image_url)
        }
    } else {
        return {
            source: "",
            type: "image"
        }
    }
}
async function getItemImage(imageUrl: string): Promise<string | null> {    
    try {
        return await fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
    } catch(e){
        console.log(e)
        return null
    }
}

function getImageType(url: string): "image" | "video" {
    const video = "video"
    const image = "image"

    const extension = getUrlExtension(url)

    return checkVideo(extension) ? video : image
}
function getUrlExtension(url: string): string {
    // remove hashes (#) and return extension if exists
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

function checkVideo(extension: string): boolean {
    const videoTypes = ["mp4"]

    return videoTypes.includes(extension)
}

function setItemInfo(item: ItemType): ItemInfo {
    let name : string
    let description : string
    let attributes : ItemAttribute[]

    if (item.metadata) {
        name = item.metadata.hasOwnProperty("name") && (item.metadata as ItemMetadata).name
        description = item.metadata.hasOwnProperty("description") && (item.metadata as ItemMetadata).description
        attributes = item.metadata.hasOwnProperty("attributes") && (item.metadata as ItemMetadata).attributes
    }

    // return item info
    return {
        name: name,
        description: description,
        collection: item.name,
        ownedBy: item.owner_of,
        attributes: attributes,
    }
}
