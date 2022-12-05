import React, {useEffect,useState} from 'react'
import { Link,useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getCreator } from '../actions/user';
import {format} from 'timeago.js'
import Upload from './Upload';
import { deleteVideo } from '../actions/video';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VideoCard = ({type,video,recommandedVideo,theme}) => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const serchQuery = query.get('searchQuery');
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(false)

const user = JSON.parse(localStorage.getItem('profile'))?.result

const creatorId = video?.creatorId;

useEffect(() => {
 if(video) dispatch(getCreator(creatorId))
},[video]);

const handleClick = () => {
  setUpdate(true)
}


const videoId = video?._id

const handleDelete = () => {
  dispatch(deleteVideo(videoId,type="random"));
}




const {creator} = useSelector((state) => state.user);

  return (
    <div className={type === "sm" ? 'flex flex-row gap-[10px] mb-[10px] cursor-pointer' : 'flex flex-col gap-[10px] w-[360px] mb-[45px] cursor-pointer'}>
      <Link to={type === "sm" ? `/video/${recommandedVideo?._id}` : `/video/${video?._id}`}>
      <div className={type === "sm" ? 'flex flex-row gap-[10px] mb-[10px] cursor-pointer' : 'flex flex-col gap-[10px] w-[360px] mb-[45px] cursor-pointer'}>
       <img className={type === 'sm' ? 'flex-1 w-[100%] h-[120px] bg-[#999] rounded-[10px]' : 'w-[100%] h-[202px] bg-[#999] rounded-[10px]'} src={type === "sm" ? recommandedVideo.imgUrl : video?.imgUrl} alt='/'/>
       <div className={type === "sm" ? 'flex flex-1 gap-[12px]' : 'flex mt-[16px] gap-[12px]'}>
          <img className={type === "sm" ? 'hidden' : 'w-[36px] h-[36px] rounded-[50%] bg-[#999]'} src={creator?.image}/>
          <div>
              <h1 className='font-[500] text-[18px]'>{type === "sm" ? recommandedVideo?.title : video?.title}</h1>
              <h2 className='text-[16px] my-[7px] mx-[0px]'>{creator?.userName}</h2>
              <div className='text-[14px]'>{type === "sm" ? recommandedVideo?.views : video?.views} views . {type ==="sm" ? format(recommandedVideo?.createdAt) : format(video?.createdAt)}</div>
          </div>
       </div>
       </div>
      </Link>
       {user?._id === video?.creatorId && <><button onClick={handleClick} className={type === 'sm' ? 'hidden' : 'py-[10px] px-[30px] bg-slate-200 rounded-[10px] uppercase text-black '}>update</button>
                                          <button onClick={handleDelete} className={type === 'sm' ? 'hidden' : 'py-[10px] px-[30px] bg-slate-200 rounded-[10px] uppercase text-black '}>delete</button></>}
        {update && <Upload theme={theme} setUpdate={setUpdate} videoId={video} type="update"/>}
      </div>
  )
}

export default VideoCard