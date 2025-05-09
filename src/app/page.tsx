import AsidePAnel from "./components/asidePanel";
import HeaderModels from "./components/headerModels";
import MessageZone from "./components/messageZone";
import SendMessage from "./components/sendMessage";

export default function Home() {
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-[20%]">
        <AsidePAnel/>
      </div>
      <div className="flex flex-col gap-1 w-[80%]">
        <HeaderModels/>
        <div className="flex flex-col h-full justify-center items-center">
          <MessageZone/>
          <SendMessage/>
        </div>
      </div>
    </div>
  );
}