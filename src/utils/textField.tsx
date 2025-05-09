"use client";
import { useState, useRef, useEffect } from "react";

export default function TextField() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const maxHeight = 4 * 24;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setValue("");
    }
  };

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