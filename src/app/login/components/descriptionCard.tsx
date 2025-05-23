"use client";
import { DropBlob } from "@/components/dropsCard";
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export default function DescripstionCard() {
  return (
    <div className="flex flex-col">
      <div className="m-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0">
            <DropBlob
              size={340}
              duration={8}
              delay={0}
              opacity={0.4}
              color="#00C6E090"
              movent="-70 -70 250 250"
            />
            <DropBlob
              size={300}
              duration={6}
              delay={1}
              opacity={0.3}
              color="#0F00E090"
              movent="-70 -70 250 250"
            />
            <DropBlob
              size={260}
              duration={4}
              delay={2}
              opacity={0.1}
              color="#5900E090"
              movent="-70 -70 250 250"
            />
          </div>
          <div className="absolute inset-0 bottom-full left-[75%] top-[60%]">
            <DropBlob
              size={340}
              duration={8}
              delay={0}
              opacity={0.4}
              color="#00C6E090"
              movent="-70 -70 250 250"
            />
            <DropBlob
              size={300}
              duration={6}
              delay={1}
              opacity={0.3}
              color="#0F00E090"
              movent="-70 -70 250 250"
            />
            <DropBlob
              size={260}
              duration={4}
              delay={2}
              opacity={0.1}
              color="#5900E090"
              movent="-70 -70 250 250"
            />
          </div>
          <div className="m-[70px] z-10 bg-card p-4 rounded-xl shadow-lg max-w-lg backdrop-blur-sm">
            <p className="text-5xl font-black bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent w-fit mb-4">
              Chat IA
            </p>
            <p className="text-[#03071290] font-normal">
              Consultas SQL, conocimiento vectorial y JIRA, todo en una sola
              conversación.
            </p>
            <p className="text-[#03071290] font-normal mt-4">
              Preguntas tú, conecto yo, responde la inteligencia.
            </p>
            <div
              className="bg-card w-fit p-2 px-4 rounded-4xl mt-4"
              onClick={() => console.log("click")}
            >
              <p className="text-[#03071290] font-sans">Registrar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
