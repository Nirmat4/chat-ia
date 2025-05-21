export default function SearchCard() {
  return (
    <div className="flex flex-row items-center gap-4 bg-card p-2 rounded-[18px] text-gray-700 backdrop-blur-sm border-[0.5px] border-[#99a1af10]">
      <div className="blur-sm pl-4">
        <div className="p-2 animate-spin bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 w-[50px] h-[50px] aspect-square rounded-full">
          <div className="rounded-full h-full w-full bg-[#ffffff]"></div>
        </div>
      </div>
      <div className="p-2">
        <p className="text-[#00000090] font-black text-lg">Busqueda Profunda</p>
        <p className="text-[#00000080] font-sans">Estamos revisando cuidadosamente tus fuentes para encontrar justo lo que necesitas. Este proceso será breve.</p>
      </div>
    </div>
  );
}
