"use client";
import FitbitRoundedIcon from "@mui/icons-material/FitbitRounded";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useState } from "react";

type CardThinkProps = {
  Seg: string;
};

export default function CardThink({ Seg }: CardThinkProps) {
  const [open, setOpen] = useState(true);
  const style={ fontSize: 18 }

  return (
    <div className="mb-4">
      <div onClick={() => setOpen((prev) => !prev)} className={`bg-card rounded-lg ${open?"mb-2":""} backdrop-blur-sm w-[150px] p-1 flex flex-row justify-around items-center`}>
        <div className="flex flex-row justify-around items-center gap-[6px]">
          <FitbitRoundedIcon style={{ fontSize: 16 }} />
          <p className="font-sans">Thought</p>
        </div>
        {open?<KeyboardArrowUpRoundedIcon style={style}/>:<KeyboardArrowDownRoundedIcon style={style}/>}
      </div>
      {open?(
        <div className="bg-card p-4 border-l-[#99a1af30] border-l-4 rounded-r-lg text-gray-700 backdrop-blur-sm">
          {Seg.split("\n").map((line, i) => (
            <p key={i} className="m-0 whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      ):<></>}
    </div>
  );
}
