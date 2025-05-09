"use client"
import { useState } from "react";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function HeaderModels(){
    return (
        <div>
            <CustomDropdown/>
        </div>
    );
}

function CustomDropdown() {
  const [selected, setSelected] = useState("DeepSeek R1");
  const [open, setOpen] = useState(false);
  const options = ["DeepSeek-R1", "Qwen3", "Phi-4"];

  return (
    <div className={`relative w-[170] m-2 p-2 rounded-lg hover:bg-card hover:shadow-gray-${open?"100":"300"} hover:shadow-lg ${open?"bg-card shadow-gray-100 shadow-lg":""}`}>
      <div
        onClick={() => setOpen(!open)}
        className="flex flex-row justify-between text-[18px] font-black"
      >
        {selected}
        <KeyboardArrowDownRoundedIcon/>
      </div>
      {open && (
        <ul className={`absolute top-full left-0 w-full my-2 p-2 gap-1 rounded-lg ${open?"bg-card shadow-gray-300 shadow-lg":""}`}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="text-[15px] font-sans"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}