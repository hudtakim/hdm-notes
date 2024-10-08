import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HDM Notes",
  description: "HDM Notes - Gotta notes 'em all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Electrolize&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <div className="main-wrapper">{children}</div>
      </body>
    </html>
  );
}
