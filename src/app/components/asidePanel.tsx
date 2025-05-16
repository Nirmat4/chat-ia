"use client";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded";
import { Context } from "@/app/context/context";
import { useContext } from "react";

export default function AsidePanel() {
  const { handleCreateSpace, spaces, handleChangeChat } = useContext(Context);

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
      <div className="flex flex-col mx-2">
        {spaces.map((space) => (
          <div
            key={space}
            onClick={()=>handleChangeChat(space)}
            className="hover:bg-card ruounded-md flex flex-col p-1 m-0.5 backdrop-blur-sm"
          >
            <p className="font-sans">{space}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
