import AsidePanel from "./components/asidePanel";
import HeaderModels from "./components/headerModels";
import SendMessage from "./components/sendMessage";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full h-screen overflow-hidden">
      <AsidePanel />
      <div className="flex flex-col h-screen w-full justify-start items-center">
        <HeaderModels />
        <div className="relative w-full h-full flex flex-col justify-end items-center">
          <div className="absolute w-full h-full">{children}</div>
          <SendMessage />
        </div>
      </div>
    </div>
  );
}
