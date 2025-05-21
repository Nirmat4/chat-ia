"use client";
import { useContext, useState } from "react";
import TextField from "@/utils/textField";
import StorageIcon from "@mui/icons-material/Storage";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import { Context } from "../context/context";

const style = { fontSize: 17 };
const initialButtons = [
  { tipo: "SQL", flag: false, icon: <StorageIcon sx={style} />, texto: "Busqueda en Bases de Datos SQL"},
  { tipo: "EMD", flag: false, icon: <TrendingUpIcon sx={style} />, texto: "Busqueda por paridad semanticas"},
  { tipo: "JQL", flag: false, icon: <PersonSearchIcon sx={style} />, texto: "Busqueda en Jira Desk"},
];

export default function SendMessage() {
  const { setSql, setJql, setEmb, sql, jql, emb, sendMessage, send } = useContext(Context);
  const [buttons, setButtons] = useState(initialButtons);
  const [add, setAdd] = useState(false);

  const toggleButton = (tipo: string) => {
    setButtons((prev) =>
      prev.map((btn) => (btn.tipo === tipo ? { ...btn, flag: !btn.flag } : btn))
    );
    if (tipo === "SQL") setSql(!sql);
    if (tipo === "EMD") setEmb(!emb);
    if (tipo === "JQL") setJql(!jql);
  };

  return (
    <div className="flex flex-col p-4 w-[90%] xl:w-[60%] lg:w-[70%] 2xl:w-[45%] rounded-[23px] bg-card backdrop-blur-sm shadow-gray-300 shadow-lg">
      <TextField />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setAdd(!add)}
            className={`w-[32px] h-[32px] border rounded-full transition-all duration-200 cursor-pointer ${
              add
                ? "bg-blue-300 text-blue-700 border-blue-300"
                : "bg-transparent text-black border-gray-400"
            }`}
            title="Añadir Documento"
          >
            <AddRoundedIcon sx={{ fontSize: 22 }} />
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
            >
              {boton.icon}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-sm bg-card px-2 py-1 opacity-0 rounded-sm group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-100 whitespace-nowrap z-50">
                {boton.texto}
              </span>
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              sendMessage();
            }}
            className={`w-[32px] h-[32px] border rounded-full transition-all duration-200 cursor-pointer ${
              send
                ? "bg-blue-300 text-blue-700 border-blue-300"
                : "bg-black text-white border-black"
            }`}
            title="Enviar"
          >
            {send?<CropSquareRoundedIcon sx={style} />:<ArrowUpwardIcon sx={style} />}
          </button>
        </div>
      </div>
    </div>
  );
}
