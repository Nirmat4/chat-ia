"use client"
import { DropBlob } from "@/components/dropsCard";

export default function DescripstionCard() {
  return (
    <div className="flex flex-col">
      <div className="m-4">
        <p className="text-5xl font-bold bg-gradient-to-r from-violet-500 to-sky-500 bg-clip-text text-transparent w-fit">
          Chat IA
        </p>
        <div className={` relative`}>
          <div className="absolute inset-0" />
          <DropBlob
            size={340}
            duration={8}
            delay={0}
            opacity={0.5}
            color="#00C6E090"
            movent="-70 -70 250 250"
          />
          <DropBlob
            size={300}
            duration={6}
            delay={1}
            opacity={0.4}
            color="#0F00E090"
            movent="-70 -70 250 250"
          />
          <DropBlob
            size={260}
            duration={4}
            delay={2}
            opacity={0.3}
            color="#5900E090"
            movent="-70 -70 250 250"
          />
          <div>
            <p>
              Consultas SQL, conocimiento vectorial y JIRA, todo en una sola
              conversación.
              <br />
              Preguntas tú, conecto yo, responde la inteligencia.
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-card w-fit z-50 p-2 px-4 rounded-4xl"
        onClick={() => console.log("click")}
      >
        <p>Registrar</p>
      </div>
    </div>
  );
}
