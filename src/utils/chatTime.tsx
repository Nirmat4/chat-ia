"use client";
import { Context } from "@/app/context/context";
import { useContext, useEffect, useState } from "react";

interface Chat{
  id: string
  name: string
  date: string
}

export default function ChatTime(){
  const { chats } = useContext(Context);
  const [hoy, setHoy] = useState<Chat[]>([]);
  const [semana, setSemana] = useState<Chat[]>([]);
  const [mes, setMes] = useState<Chat[]>([]);
  const [año, setAño] = useState<Chat[]>([]);
  useEffect(()=>{
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const haceUnaSemana = new Date(hoy);
    haceUnaSemana.setDate(hoy.getDate() - 7);
    const haceUnMes = new Date(hoy);
    haceUnMes.setMonth(hoy.getMonth() - 1);
    const haceUnAnio = new Date(hoy);
    haceUnAnio.setFullYear(hoy.getFullYear() - 1);

    setHoy(chats.filter(item=>{
    const fechaItem = new Date(item.date);
      return fechaItem > hoy;
    }))
    setSemana(chats.filter(item=>{
      const fechaItem = new Date(item.date);
      return fechaItem > haceUnaSemana && fechaItem < hoy;
    }))
    setMes(chats.filter(item=>{
      const fechaItem = new Date(item.date);
      return fechaItem > haceUnMes && fechaItem < haceUnaSemana;
    }))
    setAño(chats.filter(item=>{
      const fechaItem = new Date(item.date);
      return fechaItem > haceUnAnio && fechaItem < haceUnMes;
    }))
  }, [chats])
  return (
    <div className="flex flex-col mx-2">
      {hoy.length==0?<></>:(
        <div>
          <p>Hoy</p>
          {hoy.map((chatLocal)=>(
            <Card key={chatLocal.id} chatLocal={chatLocal}/>
          ))}
        </div>
      )}
      {semana.length==0?<></>:(
        <div>
          <p className="mb-0.5 mt-4 font-bold tex-[15px]">Esta semana</p>
          {semana.map((chatLocal)=>(
            <Card key={chatLocal.id} chatLocal={chatLocal}/>
          ))}
        </div>
      )}
      {mes.length==0?<></>:(
        <div>
          <p className="mb-0.5 mt-4 font-bold tex-[15px]">Este mes</p>
          {mes.map((chatLocal)=>(
            <Card key={chatLocal.id} chatLocal={chatLocal}/>
          ))}
        </div>
      )}
      {año.length==0?<></>:(
        <div>
          <p className="mb-0.5 mt-4 font-bold tex-[15px]">Este año</p>
          {año.map((chatLocal)=>(
            <Card key={chatLocal.id} chatLocal={chatLocal}/>
          ))}
        </div>
      )}
    </div>
  );
}

interface CardProps {
  chatLocal: Chat;
}

function Card({ chatLocal }: CardProps) {
  const { handleChangeChat, chat } = useContext(Context)
  return (
    <div
      onClick={()=>handleChangeChat(chatLocal.id)}
      className={`${chat===chatLocal.id?"bg-[#99a1af60]":"hover:bg-card"} rounded-sm flex flex-col p-1 px-2 backdrop-blur-sm m-[1px]`}
    >
      <p className="font-sans truncate text-[15px]">{chatLocal.name}</p>
    </div>
  )
}