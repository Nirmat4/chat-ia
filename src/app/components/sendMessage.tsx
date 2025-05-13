"use client";

import { useState } from "react";
import TextField from "@/utils/textField";
import StorageIcon from '@mui/icons-material/Storage';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Datos iniciales
const style={ fontSize: 17 }
const initialButtons = [
  { tipo: "SQL", flag: false, icon: <StorageIcon sx={style}/> },
  { tipo: "EMD", flag: false, icon: <TrendingUpIcon sx={style}/> },
  { tipo: "JQL", flag: false, icon: <PersonSearchIcon sx={style}/> },
];

export default function SendMessage() {
  const [buttons, setButtons] = useState(initialButtons);
  const [send, setSend]=useState(false)
  const [add, setAdd]=useState(false)

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const toggleButton = (tipo: string) => {
    setButtons(prev =>
      prev.map(btn =>
        btn.tipo === tipo ? { ...btn, flag: !btn.flag } : btn
      )
    );
  };

  const sendMessageButton=async()=>{
    setSend(true)
    await wait(100);
    setSend(false)
  }

  return (
    <div className="flex flex-col m-2 p-4 w-[90%] xl:w-[70%] rounded-[23px] bg-card shadow-gray-300 shadow-lg">
      <TextField />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <button
            onClick={()=>setAdd(!add)}
            className={`w-[32px] h-[32px] border rounded-full transition-all duration-200 cursor-pointer ${
              add
                  ? "bg-blue-300 text-blue-700 border-blue-300"
                  : "bg-transparent text-black border-gray-400"
              }`}
            title="Enviar"
          >
            <AddRoundedIcon sx={{ fontSize: 22 }}/>
          </button>
          {buttons.map((boton, index) => (
            <button
                key={index}
                onClick={() => toggleButton(boton.tipo)}
                className={`w-[32px] h-[32px] border rounded-full transition-all duration-200 cursor-pointer ${
                boton.flag
                    ? "bg-blue-300 text-blue-700 border-blue-300"
                    : "bg-transparent text-black border-gray-400"
                }`}
                title={boton.tipo}
            >
                {boton.icon}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-sm text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {boton.tipo}
                </span>
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={()=>sendMessageButton()}
            className={`w-[32px] h-[32px] border rounded-full transition-all duration-200 cursor-pointer ${
              send
                  ? "bg-blue-300 text-blue-700 border-blue-300"
                  : "bg-black text-white border-black"
              }`}
            title="Enviar"
          >
            <ArrowUpwardIcon sx={style}/>
          </button>
        </div>
      </div>
    </div>
  );
}
