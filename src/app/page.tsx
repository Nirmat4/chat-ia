import HeaderModels from "./components/headerModels";
import MessageZone from "./components/messageZone";
import SendMessage from "./components/sendMessage";

export default function Home() {
  return (
    <div className="">
      <HeaderModels/>
      <div className="flex flex-col h-full justify-center items-center">
        <MessageZone/>
        <SendMessage/>
      </div>
    </div>
  );
}