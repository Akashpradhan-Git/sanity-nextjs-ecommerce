import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRETS,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRETS,
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
})
