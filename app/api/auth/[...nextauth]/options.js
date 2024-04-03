import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import connectMongoDB from "@/app/lib/mongodb";

export const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
                console.log('this is profile from GitHub');
                console.log(profile);

                let userRole = 'GitHub User';
                if (profile?.email === 'arvindkshwh939@gmail.com') {
                    userRole = 'admin';
                }

                return {
                    ...profile,
                    role: userRole
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                console.log('this is profile from Google');
                console.log(profile);

                let userRole = 'userRole';
                if (profile?.email === 'arvindkshwh939@gmail.com') {
                    userRole = 'admin';
                }

                return {
                    ...profile,
                    id: profile.sub,
                    avatar_url: profile.picture,
                    role: userRole
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email:',
                    type: 'text',
                    placeholder: 'your email'
                },
                password: {
                    label: 'Password:',
                    type: 'password',
                    placeholder: 'your password'
                }
            },
            async authorize(credentials) {
                try {
                    connectMongoDB();
                    const foundUser = await User.findOne({ email: credentials.email }).lean().exec();

                    if (foundUser) {
                        console.log("user exist");
                        const match = await bcrypt.compare(credentials.password, foundUser.password);
                        if (match) {
                            console.log('successful login');
                            delete foundUser.password;
                            foundUser["role"] = "admin";
                            return foundUser;
                        } else {
                            console.error("Wrong email or password");
                            return null;
                        }
                    } else {
                        console.error("User not found");
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                }

                return null;
            }
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            // console.log("this is jwt === ");
            // console.log(user);
            // console.log(token);
            if (user) {
                token.role = user.role;
                token.avatar_url = user.avatar_url;
            }
            return token;
        },
        async session({session, token}) {
            // console.log("this is session === ");
            // console.log(token);
            // console.log(session);
            if (session?.user) session.user.role = token.role;
            session.user.image = token.avatar_url;
            return session;
        }
    }
}
