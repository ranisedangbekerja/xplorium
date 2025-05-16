import "@/styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: {session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Xplorium - Xplore The Maximum!</title>
        <meta name="description" content="Xplorium helps curious kids explore fun, hands-on projects with ease and joy!"/>
        <link rel="icon" href="/Maskot-plo.png"/>
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
