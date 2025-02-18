import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
     appearance={{baseTheme:dark}}
     afterSignOutUrl="/"
     >
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider
        attribute="class"
        forcedTheme="dark"
        storageKey="twitch-clone-theme"
        >
          <Toaster theme="light" position="bottom-center" />
        {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
