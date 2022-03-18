import prepareUrl from "../../../library/api/prepareUrl"

export default async function configureItems(items) {
    // loop through all items, then configure
    return await Promise.all(items.map(async (item) => await configureItem(item) ))
}
async function configureItem(item) {
    // set item id
    item.id = setItemId(item)

    // set metadata
    item.metadata = await setMetadata(item.token_uri)
    
    // set image
    item.image = await setItemImage(item.metadata)

    // set item info
    item.info = setItemInfo(item)

    return item
}
function setItemId(item) {
    // return item id
    return {
        address: item.token_address,
        id: item.token_id
    }
}

async function setMetadata(url) {
    return( url ? getMetadata(url) : {} )
} 

async function getMetadata(url) {
     const preparedUrl = prepareUrl(url)

    // fetch metadata
    return await fetchMetadata(preparedUrl)
}
async function fetchMetadata(url) {
    try {
        return await fetch(url).then((res) => res.json())
    } catch(e) {
        console.log(e)
        return {}
    }
}

async function setItemImage(metadata) {    
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
            source: "/images/default/noImage.jpeg",
            type: "image"
        }
    }
}
async function getItemImage(imageUrl) {    
    try {
        return await fetch(imageUrl)
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
    } catch(e){
        console.log(e)
        return null
    }
}

function getImageType(url) {
    const video = "video"
    const image = "image"

    const extension = getUrlExtension(url)

    return( checkVideo(extension) ? video : image )
}
function getUrlExtension(url) {
    // remove hashes (#) and return extension if exists
    return url.split(/[#?]/)[0].split('.').pop().trim();
}

function checkVideo(extension) {
    const videoTypes = ["mp4"]

    return videoTypes.includes(extension)
}

function setItemInfo(item) {
    // return item info
    return {
        name: item.metadata.name,
        description: item.metadata.description,
        collection: item.name,
        ownedBy: item.owner_of,
        attributes: item.metadata.attributes,
    }
}
