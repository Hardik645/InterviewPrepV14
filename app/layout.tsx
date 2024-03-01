import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "./context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interview Prep",
  description: "Web application that contains problems and video solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel="icon" href="/favicon.png"/>
			</head>
      <body className={inter.className}>
      <ToastContainer />
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
