import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { spaces_send } from "@/app/database/spaces";


export default function AsidePanel(){
    const spaces=spaces_send
    return (
        <div className="bg-card h-full">
            <div className='m-1 p-1 flex flex-row justify-between items-center'>
                <div className='hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center'>
                    <DashboardRoundedIcon/>
                </div>
                <div className='flex flex-row justify-around items-center gap-1'>
                    <div className='hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center'>
                        <SearchRoundedIcon/>
                    </div>
                    <div className='hover:bg-card w-[38px] h-[38px] rounded-[10px] flex flex-col justify-center items-center'>
                        <AppRegistrationRoundedIcon/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col mx-2'>
                {spaces.map((space, index)=>(
                    <div key={index} className='hover:bg-card rounded-md flex flex-col p-1 m-0.5 backdrop-blur-md'>
                        <p className='font-sans'>{space.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}