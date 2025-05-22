"use client";
import AsidePanel from "./pages/asidePanel";
import HeaderModels from "./pages/headerModels";
import SendMessage from "./pages/sendMessage";
import { ContextProvider } from "@/app/context/context";
import "@/styles/globals.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  
  return (
    <html lang="en" className="overflow-hidden">
      <body>
        <div className="flex flex-row w-full h-screen overflow-hidden">
          <ContextProvider>
            <AsidePanel />
            <div className="flex flex-col h-screen w-full justify-start items-center">
              <HeaderModels />
              <div className="relative w-full h-full flex flex-col justify-end items-center">
                <div className="absolute w-full h-full">
                  {children}
                </div>
                <SendMessage />
              </div>
            </div>
          </ContextProvider>
        </div>
      </body>
    </html>
  );
}
