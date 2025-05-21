"use client";
import { Context } from "@/app/context/context";
import FitbitRoundedIcon from "@mui/icons-material/FitbitRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useContext, useState } from "react";

type CardThinkProps = {
  seg: string;
  id: string;
};

export default function CardThink({ seg, id }: CardThinkProps) {
  const { responding, currentMessage, send } = useContext(Context);
  const [open, setOpen] = useState(true);
  const style = { fontSize: 18 };

  return (
    <div className="mb-4">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className={`bg-card rounded-lg ${
          open ? "mb-2" : ""
        } backdrop-blur-sm w-[150px] p-1 px-2 flex flex-row justify-between items-center`}
      >
        <div className="flex flex-row items-center gap-[6px]">
          {send&&currentMessage===id? (
            <div className="">
              <div className="flex flex-row gap-[2px]">
                <div className="w-[6px] animate-pulse bg-slate-700 h-[6px] rounded-full "></div>
                <div className="w-[6px] animate-pulse bg-slate-700 h-[6px] rounded-full "></div>
                <div className="w-[6px] animate-pulse bg-slate-700 h-[6px] rounded-full "></div>
              </div>
            </div>
          ) : (
            <FitbitRoundedIcon style={{ fontSize: 16 }} />
          )}
          <p className="font-sans">Thought</p>
        </div>
        {open ? (
          <KeyboardArrowUpRoundedIcon style={style} />
        ) : (
          <KeyboardArrowDownRoundedIcon style={style} />
        )}
      </div>
      {open ? (
        <div className="bg-card p-4 border-l-[#99a1af30] border-l-4 rounded-r-lg text-gray-700 backdrop-blur-sm">
          {seg.split("\n").map((line, i) => (
            <p key={i} className="m-0 whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
