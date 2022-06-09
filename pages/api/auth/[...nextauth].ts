import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            // persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            // send the access token to the client
            session.accessToken = token.accessToken
            return session
        }
      }
})
 