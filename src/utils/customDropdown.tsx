"use client";
import { useContext, useEffect, useRef, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { Context } from "@/app/context/context";

interface Model {
  name: string;
  description: string;
  icon: React.ReactNode;
}

export default function CustomDropdown() {
  const { selectedModel, models, setSelected } = useContext(Context);
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={`relative w-[170px] mx-4 m-2 p-2 rounded-lg hover:bg-card hover:shadow-gray-${
        open ? "100" : "300"
      } ${open ? "bg-card" : ""}`}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between text-lg font-black cursor-pointer"
      >
        {selectedModel ? (
          <div>
            <p className="inline">{selectedModel.name}</p>
          </div>
        ) : (
          <p className="text-red-500">Modelo no encontrado</p>
        )}
        <KeyboardArrowDownRoundedIcon />
      </div>

      {open && (
        <ul className="absolute top-full left-0 w-[340px] mt-2 p-1 rounded-lg bg-card shadow-lg z-50 backdrop-blur-sm">
          {models.map((model: Model) => (
            <li
              key={model.name}
              onClick={() => {
                setSelected(model.name);
                setOpen(false);
              }}
              className="flex flex-row justify-around items-center mb-2 last:mb-0 cursor-pointer hover:bg-card rounded-lg p-2"
            >
              <div className="w-[10%]">
                {model.icon}
              </div>
              <div className="flex flex-col w-[90%]">
                <p className="text-[14px] font-semibold">{model.name}</p>
                <p className="text-[12px] text-[#36415390]">{model.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
