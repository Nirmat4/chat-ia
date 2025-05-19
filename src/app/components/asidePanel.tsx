"use client";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import { Context } from "@/app/context/context";
import { useContext } from "react";
import ChatTime from "@/utils/chatTime";

export default function AsidePanel() {
  const { handleCreateSpace } = useContext(Context);

  return (
    <div className="w-[260px] bg-card h-full">
      <div className="m-1 p-1 flex flex-row justify-between items-center">
        <div className="hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center">
          <DashboardRoundedIcon />
        </div>
        <div className="flex flex-row justify-around items-center gap-1">
          <div className="hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center">
            <SearchRoundedIcon />
          </div>
          <div
            className="hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center"
            onClick={handleCreateSpace}
          >
            <AppRegistrationRoundedIcon />
          </div>
        </div>
      </div>
      <ChatTime/>
    </div>
  );
}
