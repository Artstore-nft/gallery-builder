 export default function prepareUrl(url: string): string {
    // check if IPFS, then handleIpfs if true
    return( isIpfs(url) ? handleIpfs(url) : url )
}
function isIpfs(url: string): boolean {
    return url.startsWith("ipfs://")
}
function handleIpfs(url: string): string {
    return url.replace("ipfs://", `${process.env.IPFS_GATEWAY}`)
}
