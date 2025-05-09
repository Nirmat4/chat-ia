import HeaderModels from "./components/headerModels";
import MessageZone from "./components/messageZone";
import SendMessage from "./components/sendMessage";

export default function Home() {
  return (
    <div>
      <HeaderModels/>
      <div className="flex flex-col justify-center items-center">
        <MessageZone/>
        <SendMessage/>
      </div>
    </div>
  );
}