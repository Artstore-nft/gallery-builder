/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  env: {
    IPFS_GATEWAY: process.env.IPFS_GATEWAY,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  /*
  images: {
    domains: ['ipfs.moralis.io', 'lh3.googleusercontent.com', 'pbs.twimg.com', 'ikzttp.mypinata.cloud', 
    'images.0xzuki.com', 'prod-metadata.s3.amazonaws.com', 'duskbreakers.gg', 'i6gznw767phrf5tnpxtdo4pxmuhame3lmtxwomfhwl5mys2dnkaa.arweave.net',
    'wearables.sfo2.digitaloceanspaces.com']
  },
  */
  reactStrictMode: false,
}