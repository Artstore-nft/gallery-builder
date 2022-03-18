 export default function prepareUrl(url) {
    // check if IPFS, then handleIpfs if true
    return( isIpfs(url) ? handleIpfs(url) : url )
}
function isIpfs(url) {
    return url.startsWith("ipfs://")
}
function handleIpfs(url) {
    return url.replace("ipfs://", `${process.env.IPFS_GATEWAY}`)
}
