import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

export default NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.token = account.id_token
            }
            return token
        },
        async session({ session, token }) {
            if (token.token)
                session.token = token.token
            return session
        },
    },
})