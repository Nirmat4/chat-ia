"use client";
import { Context } from "@/app/context/context";
import { useContext, useEffect, useState } from "react";

interface Space{
  id: string
  name: string
  date: string
}

export default function ChatTime(){
  const { spaces } = useContext(Context);
  const [hoy, setHoy] = useState<Space[]>([]);
  const [semana, setSemana] = useState<Space[]>([]);
  const [mes, setMes] = useState<Space[]>([]);
  const [año, setAño] = useState<Space[]>([]);
  useEffect(()=>{
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const haceUnaSemana = new Date(hoy);
    haceUnaSemana.setDate(hoy.getDate() - 7);
    const haceUnMes = new Date(hoy);
    haceUnMes.setMonth(hoy.getMonth() - 1);
    const haceUnAnio = new Date(hoy);
    haceUnAnio.setFullYear(hoy.getFullYear() - 1);

    setHoy(spaces.filter(item=>{
    const fechaItem = new Date(item.date);
      return fechaItem > hoy;
    }))
    setSemana(spaces.filter(item=>{
      const fechaItem = new Date(item.date);
      return fechaItem > haceUnaSemana && fechaItem < hoy;
    }))
    setMes(spaces.filter(item=>{
      const fechaItem = new Date(item.date);
      return fechaItem > haceUnMes && fechaItem < haceUnaSemana;
    }))
    setAño(spaces.filter(item=>{
      const fechaItem = new Date(item.date);
      return fechaItem > haceUnAnio && fechaItem < haceUnMes;
    }))
  }, [spaces])
  return (
    <div className="flex flex-col mx-2">
      {hoy.length==0?<></>:(
        <div>
          <p>Esta hoy</p>
          {hoy.map((space)=>(
            <Card space={space}/>
          ))}
        </div>
      )}
      {semana.length==0?<></>:(
        <div>
          <p className="mb-0.5 mt-4 font-bold tex-[15px]">Esta semana</p>
          {semana.map((space)=>(
            <Card space={space}/>
          ))}
        </div>
      )}
      {mes.length==0?<></>:(
        <div>
          <p className="mb-0.5 mt-4 font-bold tex-[15px]">Este mes</p>
          {mes.map((space)=>(
            <Card space={space}/>
          ))}
        </div>
      )}
      {año.length==0?<></>:(
        <div>
          <p className="mb-0.5 mt-4 font-bold tex-[15px]">Este año</p>
          {año.map((space)=>(
            <Card space={space}/>
          ))}
        </div>
      )}
    </div>
  );
}

interface CardProps {
  space: Space;
}

function Card({ space }: CardProps) {
  const { handleChangeChat, chat } = useContext(Context)
  return (
    <div
      key={space.id}
      onClick={()=>handleChangeChat(space.id)}
      className={`${chat===space.id?"bg-[#99a1af60]":"hover:bg-card"} rounded-sm flex flex-col p-1 px-2 backdrop-blur-sm m-[1px]`}
    >
      <p className="font-sans truncate text-[15px]">{space.name}</p>
    </div>
  )
}