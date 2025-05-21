import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';

const style = { fontSize: 17 };
export default function Options(){
  return (
    <div className='flex flex-row my-0.5 items-center opacity-0 hover:opacity-100 transition-opacity duration-150'>
      <div className="p-[2px] px-1 rounded-lg justify-center items-center hover:bg-card hover:backdrop-blur-sm">
        <ContentCopyRoundedIcon style={style}/>
      </div>
      <div className="p-[2px] px-1 rounded-lg justify-center items-center hover:bg-card hover:backdrop-blur-sm">
        <ThumbUpAltOutlinedIcon style={style}/>
      </div>
      <div className="p-[2px] px-1 rounded-lg justify-center items-center hover:bg-card hover:backdrop-blur-sm">
        <ThumbDownAltOutlinedIcon style={style}/>
      </div>
      <div className="p-[2px] px-1 rounded-lg justify-center items-center hover:bg-card hover:backdrop-blur-sm">
        <CachedRoundedIcon style={style}/>
      </div>
    </div>
  )
}