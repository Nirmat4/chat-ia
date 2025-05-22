"use client";
import "@/styles/globals.css";
import { ContextProvider } from "@/app/context/context";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
