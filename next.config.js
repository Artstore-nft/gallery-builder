/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  env: {
    IPFS_GATEWAY: process.env.IPFS_GATEWAY,
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET
  },
  images: {
    loader: 'imgix',
    path: '',
  },
  reactStrictMode: false,
}