import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Aarya RK Social Chat",
  description: "Chat with Aarya - Your AI companion. Connect with friends, share posts, and explore!",
  keywords: ["chat", "social", "AI", "Aarya", "friends", "posts"],
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9952411839772191"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
