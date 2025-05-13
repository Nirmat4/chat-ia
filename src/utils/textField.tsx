"use client";
import { useContext } from "react";
import { Context }  from "@/app/context/context";

export default function TextField() {
  const {textareaRef, value, handleKeyDown, setValue}=useContext(Context);

  return (
    <div className="m-0.5 mx-1">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Pregunta lo que quieras"
        className="w-full border-0 outline-none resize-none overflow-y-auto leading-[24px]"
        rows={1}
        style={{ maxHeight: "192px" }}
      />
    </div>
  );
}