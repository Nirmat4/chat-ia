"use client";
import CustomDropdown from "@/utils/customDropdown";

export default function HeaderModels() {
  return (
    <div className="flex flex-row w-full h-[60px] justify-between items-center">
      <CustomDropdown />
      <User />
    </div>
  );
}

function User() {
  return (
    <div className="mx-4">
      <div className="w-[32px] h-[32px] rounded-full bg-purple-800 flex flex-col justify-center items-center text-white font-sans">
        J
      </div>
    </div>
  );
}
