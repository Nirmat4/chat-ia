import React from "react";
import DescripstionCard from "./components/descriptionCard";
import FormCard from "./components/formCard";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row w-fit gap-[100px] p-10 rpund items-center">
        <DescripstionCard/>
        <FormCard/>
      </div>
    </div>
  );
}
