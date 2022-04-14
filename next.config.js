/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  env: {
    IPFS_GATEWAY: process.env.IPFS_GATEWAY,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY
  },
  images: {
    loader: 'imgix',
    path: '',
  },
  reactStrictMode: false,
}