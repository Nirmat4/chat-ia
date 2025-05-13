import AsidePanel from "./components/asidePanel";
import HeaderModels from "./components/headerModels";
import MessageZone from "./components/messageZone";
import SendMessage from "./components/sendMessage";
import { ContextProvider } from "@/app/context/context";

export default function Home() {
  return (
    <div className="flex flex-row w-full h-screen overflow-hidden">
      <ContextProvider>
        <AsidePanel/>
        <div className="flex flex-col h-screen w-full justify-start items-center">
          <HeaderModels/>
          <MessageZone/>
          <SendMessage/>
        </div>
      </ContextProvider>
    </div>
  );
}