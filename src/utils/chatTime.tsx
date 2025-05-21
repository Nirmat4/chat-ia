"use client";
import { Context } from "@/app/context/context";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import { useContext, useEffect, useRef, useState } from "react";

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
  const { handleChangeChat, chat, deleteChat } = useContext(Context)
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen]=useState(false)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);
  return (
    <div ref={containerRef} className="flex flex-col relative">
      <div className={`f${chat===chatLocal.id&&"bg-card"} ${open&&"bg-card"} hover:bg-card rounded-lg flex flex-row justify-between backdrop-blur-sm my-[1px] w-full`}>
        <div
          onClick={()=>handleChangeChat(chatLocal.id)}
          className={`${chat===chatLocal.id&&"bg-card"} rounded-l-lg w-full p-1 px-2`}
        >
          <p className="font-sans truncate text-[15px]">{chatLocal.name}</p>
        </div>
        <div onClick={()=>setOpen(!open)} className={`opacity-0 hover:opacity-100 ${chat===chatLocal.id&&"bg-card opacity-100"} ${open&&"opacity-100"} rounded-r-lg p-1 pl-2`}>
            <div className={`rounded-sm hover:bg-card px-1 ${open&&"bg-card"}`}>
              <MoreHorizRoundedIcon style={{fontSize: 20}} className={`${open?"opacity-70":"opacity-0 hover:opacity-70"} ${chat===chatLocal.id&&"opacity-70"}`}/>
            </div>
        </div>
      </div>
      {open&&(
        <div className="absolute bg-card p-1 backdrop-blur-sm rounded-lg flex flex-col z-50 -right-[140px] top-full -mt-2">
          <div className="flex flex-row gap-2 items-center hover:bg-card rounded-sm pr-8 p-1 pl-2">
            <IosShareRoundedIcon style={{fontSize: 20}}/>
            <p className="text-[15px] font-sans">Compartir</p>
          </div>
          <div className="flex flex-row gap-2 items-center hover:bg-card rounded-sm pr-8 p-1 pl-2">
            <UnarchiveOutlinedIcon style={{fontSize: 20}}/>
            <p className="text-[15px] font-sans">Archivar</p>
          </div>
          <div className="flex flex-row gap-2 items-center hover:bg-card rounded-sm pr-8 p-1 pl-2">
            <AutoFixHighRoundedIcon style={{fontSize: 20}}/>
            <p className="text-[15px] font-sans">Cambiar Nombre</p>
          </div>
          <div onClick={()=>{deleteChat(chatLocal.id)}} className="flex flex-row gap-2 items-center hover:bg-[#ffa2a250] rounded-sm pr-8 p-1 pl-2">
            <DeleteForeverOutlinedIcon style={{fontSize: 20, color: "#fb2c36"}}/>
            <p className="text-[15px] font-sans text-red-500">Eliminar</p>
          </div>
        </div>
      )}
    </div>
  )
}