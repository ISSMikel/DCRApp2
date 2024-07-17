import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "~/server/models/User.modal";
import bcrypt from "bcrypt";



export default NuxtAuthHandler({

    secret: useRuntimeConfig().authSecret,


    pages: {
        signIn: "/login",
    },

    providers: [
        // @ts-expect-error
        CredentialsProvider.default({
            name: 'credentials',
            credentials: {},
            async authorize(credentials: {
                username: string,
                password: string,
            }) {

                //TODO: Fetch user from database
                const user = await User.findOne({ username: credentials.username });

                if (!user) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Unauthorized"
                    })
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw createError({
                        statusCode: 401,
                        statusMessage: "Unauthorized",
                    });
                }

                return {
                    ...user.toObject(),
                    password: undefined,
                };
            },


        }),
    ],

    session: {
        strategy: "jwt",
    },

    //This to get back the user info which would be accessed and displayed on the index page.
    callbacks: {
        async jwt({ token, user, account }) {

            if (user) {
                token = {
                    ...token,
                    ...user,
                };
            }

            return token;
        },

        //When the session is called, the user token and info are packaged in the session.
        async session({ session, token }) {

            session.user = {
                ...token,
                ...session.user,
            };

            return session;
        },

    },

}); 