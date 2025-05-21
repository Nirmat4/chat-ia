"use client";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import { Context } from "@/app/context/context";
import { useContext } from "react";
import ChatTime from "@/utils/chatTime";

export default function AsidePanel() {
  const { handleCreateChat } = useContext(Context);

  return (
    <div className="relative overflow-hidden rounded-r-lg w-[260px] ">
      <div className="absolute w-full h-full -z-50 top-full">
        <div className="absolute  w-52 h-52 rounded-full bg-gradient-to-r from-indigo-700 to-blue-400 opacity-80" />
        <div className="absolute  w-36 h-36 rounded-full bg-gradient-to-r from-sky-600 to-cyan-400 opacity-80" />
      </div>
      <div className="bg-card h-full">
        <div className="m-1 p-1 flex flex-row justify-between items-center">
          <div className="hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center">
            <DashboardRoundedIcon />
          </div>
          <div className="flex flex-row justify-around items-center gap-1">
            <div className="hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center">
              <SearchRoundedIcon />
            </div>
            <div
              onClick={async ()=>{await handleCreateChat()}}
              className="hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center"
            >
              <AppRegistrationRoundedIcon />
            </div>
          </div>
        </div>
        <ChatTime/>
      </div>
    </div>
  );
}
