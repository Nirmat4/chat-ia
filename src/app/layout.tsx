"use client";
import AsidePanel from "./components/asidePanel";
import HeaderModels from "./components/headerModels";
import SendMessage from "./components/sendMessage";
import { ContextProvider } from "@/app/context/context";
import "./globals.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  
  return (
    <html lang="en" className="overflow-hidden">
      <body>
        <div className="flex flex-row w-full h-screen overflow-hidden">
          <ContextProvider>
            <AsidePanel />
            <div className="flex flex-col h-screen w-full justify-start items-center">
              <HeaderModels />
              <div className="flex flex-col items-center justify-end w-[90%] xl:w-[60%] lg:w-[70%] 2xl:w-[45%]">
                {children}
                <SendMessage />
              </div>
            </div>
          </ContextProvider>
        </div>
      </body>
    </html>
  );
}
