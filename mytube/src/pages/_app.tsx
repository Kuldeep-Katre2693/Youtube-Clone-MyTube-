import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../lib/AuthContext";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
<div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Head>
  <title>MyTube Clone</title>
</Head>
        <Header />
        <Toaster richColors position="top-right" />
        <div className="flex">
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </div>
      <Script
  src="https://checkout.razorpay.com/v1/checkout.js"
  strategy="afterInteractive"
/>

    </UserProvider>
  );
}
