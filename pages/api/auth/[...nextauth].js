// pages/api/auth/[...nextauth].js
import NextAuthImport from "next-auth";
import CredentialsImport from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

const NextAuth = NextAuthImport.default ?? NextAuthImport;
const CredentialsProvider = CredentialsImport.default ?? CredentialsImport;

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const filePath = path.join(process.cwd(), "data", "usuarios.json");
        const content = fs.readFileSync(filePath, "utf8");
        const usuarios = JSON.parse(content);

        const user = usuarios.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return { id: user.email, name: user.nombre, email: user.email, image: user.avatar || null };
        } else {
          throw new Error("Usuario o contraseña incorrectos");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      return session;
    },
  },
});
