import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

const style = { fontSize: 20 };
export default function Options(){
  return (
    <div className='flex flex-row gap-3 items-center mt-2 opacity-0 hover:opacity-100 transition-opacity duration-150'>
      <ContentCopyRoundedIcon style={style}/>
      <ThumbUpAltOutlinedIcon style={style}/>
      <ThumbDownAltOutlinedIcon style={style}/>
    </div>
  )
}