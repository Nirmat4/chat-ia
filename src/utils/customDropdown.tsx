"use client";
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

interface Model {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const models: Model[] = [
  {
    name: "Qwen3",
    description:
      "El políglota que domina más de 100 idiomas sin perder coherencia.",
    icon: <AutoAwesomeRoundedIcon />,
  },
  {
    name: "DeepSeek-R1",
    description:
      "El especialista en operaciones matemáticas y generación de código fiable.",
    icon: <BubbleChartRoundedIcon />,
  },
  {
    name: "Phi-4",
    description: "El experto en resolver problemas complejos con precisión.",
    icon: <ApiRoundedIcon />,
  },
];

export default function CustomDropdown() {
  const [selected, setSelected] = useState<string>(models[0].name);
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedModel: Model | undefined = models.find(
    (model) => model.name === selected
  );

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
        <ul className="absolute top-full left-0 w-[340px] mt-2 p-1 rounded-lg bg-card shadow-lg z-10 backdrop-blur-sm">
          {models.map((model: Model) => (
            <li
              key={model.name}
              onClick={() => {
                setSelected(model.name);
                setOpen(false);
              }}
              className="flex flex-row items-center gap-4 mb-2 last:mb-0 cursor-pointer hover:bg-card rounded-lg p-2"
            >
              <div className="w-[10%]">
                <div className="flex flex-row justify-center items-center w-[32px] h-[32px] rounded-full bg-card">
                  {model.icon}
                </div>
              </div>
              <div className="flex flex-col w-[90%]">
                <p className="text-[14px] font-semibold">{model.name}</p>
                <p className="text-[12px] text-gray-500">{model.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
