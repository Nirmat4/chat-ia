"use client";
import CustomDropdown from "@/utils/customDropdown";
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function HeaderModels() {
  return (
    <div className="flex flex-row w-full h-[60px] justify-between items-center">
      <CustomDropdown />
      <div className="flex flex-row items-center justify-around gap-2">
        <div className="flex flex-row hover:bg-card backdrop-blur-sm rounded-xl justify-between gap-2 items-center-safe p-1 px-2">
          <IosShareRoundedIcon style={{ fontSize: 17, color: "#364153" }}/>
          <p className="text-gray-700 text-[15px] font-sans">Compartir</p>
        </div>
        <MoreVertRoundedIcon/>
        <User />
      </div>
    </div>
  );
}

function User() {
  return (
    <div className="mx-1">
      <div className="w-[32px] h-[32px] rounded-full bg-purple-800 flex flex-col justify-center items-center text-white font-sans">
        J
      </div>
    </div>
  );
}
