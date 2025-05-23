"use client";
import { DropBlob } from "@/components/dropsCard";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

export default function FormCard() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute inset-0 left-[70%] -top-[20%]">
        <DropBlob
          size={300}
          duration={8}
          delay={0}
          opacity={0.4}
          color="#00C6E090"
          movent="-70 -70 250 250"
        />
        <DropBlob
          size={260}
          duration={6}
          delay={1}
          opacity={0.3}
          color="#0F00E090"
          movent="-70 -70 250 250"
        />
        <DropBlob
          size={220}
          duration={4}
          delay={2}
          opacity={0.1}
          color="#5900E090"
          movent="-70 -70 250 250"
        />
      </div>
      <div className="flex flex-col p-4 m-1 bg-card backdrop-blur-md rounded-[12px]">
        <p className="font-bold text-xl text-[#03071290] mb-4">Bienvenido</p>
        <div className="flex flex-row gap-2 p-1 my-1 border-b-2 border-b-[#99a1af20]">
          <AlternateEmailRoundedIcon style={{ color: "#03071290" }} />
          <input placeholder="email" className="outline-none" type="email" />
        </div>
        <div className="flex flex-row gap-2 p-1 my-1 border-b-2 border-b-[#99a1af20]">
          <LockOpenRoundedIcon style={{ color: "#03071290" }} />
          <input
            placeholder="password"
            className="outline-none"
            type="password"
          />
        </div>
        <div className="mt-8 flex flex-row gap-2">
          <button
            className="bg-card w-fit p-2 px-4 rounded-4xl"
            onClick={() => console.log("click")}
          >
            <p className="text-[#03071290] font-sans">Recuperar Contraseña</p>
          </button>
          <button
            className="bg-card w-fit p-2 px-4 rounded-4xl"
            onClick={() => console.log("click")}
          >
            <p className="text-[#03071290] font-sans">Iniciar Sesion</p>
          </button>
        </div>
      </div>
    </div>
  );
}
