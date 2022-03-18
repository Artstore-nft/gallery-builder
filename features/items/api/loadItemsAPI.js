import configureItems from "./configureItems"

export default async function loadItemsAPI(walletAddress) {
    // get items owned
    const itemsOwned = await fetchOwnedItems(walletAddress)

    // configure all items
    return await configureItems(itemsOwned)
}

async function fetchOwnedItems(address) {
    // fetch items owned
    const response = await fetch(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`, {
        headers: {
            'accept': 'application/json',
            'X-API-Key': process.env.MORALIS_API_KEY
        }
    }).then((res) => res.json())

    // return result 
    return response.result
}