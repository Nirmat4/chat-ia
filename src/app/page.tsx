import AsidePanel from "./components/asidePanel";
import HeaderModels from "./components/headerModels";
import MessageZone from "./components/messageZone";
import SendMessage from "./components/sendMessage";

export default function Home() {
  return (
    <div className="flex flex-row w-full h-screen overflow-hidden">
      <div className="w-[260px]">
        <AsidePanel/>
      </div>
      <div className="flex flex-col gap-1 w-full h-full">
        <div className="h-[60px]">
          <HeaderModels/>
        </div>
        <div className="flex flex-col">
          <div className="h-[calc(100vh-60px-130px)] w-full flex flex-col justify-center items-center overflow-y-auto">
            <MessageZone/>
          </div>
          <div className="h-[130px] w-full flex flex-col justify-center items-center">
            <SendMessage/>
          </div>
        </div>
      </div>
    </div>
  );
}