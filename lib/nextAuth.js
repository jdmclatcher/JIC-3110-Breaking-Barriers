import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            throw new Error("No credentials.");
          }
          const { email, password } = credentials;

          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({ email: email, password: password }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const user = await response.json();

          if (response.status === 200 && user) {
            console.log("success");
            return user;
          }
          throw new Error("Check your credentials");
        } catch (e) {
          console.log("e", e.message);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.name = `${user.first_name} ${user.last_name}`;
        token.per_id = user.per_id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.name = token.name;
        session.user.per_id = token.per_id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
