import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
	interface Session {
		user: {
			name?: string | null;
			email?: string | null;
			image?: string | null;
			username?: string | null;
			uid?: string | null;
		};
	}

	interface User {
		username?: string | null;
		uid?: string | null;
	}
}
// Define the options for NextAuth
const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	theme: {
		colorScheme: "light",
	},
	callbacks: {
		async session({ session, token }: { session: Session; token: any }) {
			if (session.user) {
				const user = session.user as User;
				user.username = user.name?.split(" ").join("").toLowerCase();
				user.uid = token.sub;
			}
			return session;
		},
	},
};

// Export the handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
