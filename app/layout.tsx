import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Movie DB",
  description: "Movie database UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-white">
          <h1 className="text-xl font-bold">
            <a href="/">Next Movie DB</a>
          </h1>
        </div>
        {children}
      </body>
    </html>
  );
}
