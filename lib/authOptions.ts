import CredentialsProvider from 'next-auth/providers/credentials';
import {connectMongoDB} from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},

            async authorize(credentials) {
                // @ts-ignore
                const {email, password} = credentials;

                try {
                    await connectMongoDB();
                    const user = await User.findOne({email});

                    if (!user) {
                        return null;
                    }

                    const passwordVerify = await bcrypt.compare(password, user.password);

                    if(!passwordVerify) {
                        return null;
                    }

                    return user;

                }catch (error) {
                    console.log("Error", error);
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
};

export default authOptions;