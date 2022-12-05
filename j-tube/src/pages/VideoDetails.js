import React, {useEffect} from 'react'
import { MdOutlineThumbDownOffAlt, MdOutlineThumbUpOffAlt, MdOutlineAddTask ,MdThumbUp, MdThumbDownAlt } from 'react-icons/md';
import {RiShareForwardFill} from 'react-icons/ri';
import Comments from '../components/Comments';
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getTrendVideos, getVideoById, getVideos, sendDislike, sendLike } from '../actions/video';
import { getCreator, removeSub, sendSub, updatedCurrentUser } from '../actions/user';
import {format} from 'timeago.js';
import VideoCard from '../components/VideoCard';


const VideoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();


  const currentUser = JSON.parse(localStorage.getItem('profile'))?.result


useEffect(()=>{
  if(id) dispatch(getVideoById(id));
},[id]);


const { vodeo } = useSelector((state) => state.videos)

const handleLike = () => {
  dispatch(sendLike(vodeo._id));

  if(!vodeo?.likes.includes(currentUser._id)){
    vodeo?.likes.push(currentUser._id)
    vodeo?.dislikes.splice(vodeo.dislikes.findIndex((id) => id === currentUser._id),1);
  }else {
    console.log('You have allready Liked the video')
  }
}

const handleDislike = () => {
  dispatch(sendDislike(vodeo._id));

  if(!vodeo?.dislikes.includes(currentUser._id)){
    vodeo?.dislikes.push(currentUser._id);
    vodeo?.likes.splice(vodeo.likes.findIndex((id) => id === currentUser._id),1);
  }else {
    console.log('You have allready DisLiked the video')
  }
}



const creatorId = vodeo?.creatorId;

useEffect(() => {
 if(creatorId) dispatch(getCreator(creatorId))
},[creatorId]);


const {creator} = useSelector((state) => state.user);


useEffect(() => {
  dispatch(updatedCurrentUser(currentUser?._id))
},[id]);


const {updatedUser} = useSelector((state) => state.user) 




const handleSubscribe = () => {
  if(updatedUser.subscribedUsers?.includes(creator?._id)) {
    dispatch(removeSub(vodeo.creatorId))
  }else {
    dispatch(sendSub(vodeo.creatorId))
  }
}


useEffect(()=>{
  dispatch(getTrendVideos());
},[id]);

const { trendVideos } = useSelector((state) => state.videos)


const recommandedVideos = trendVideos?.filter((trendVideo) => trendVideo?._id !== vodeo?._id)
console.log(recommandedVideos,'This is the reco')






  return (
    <div className='flex gap-[24px]'>
      <div className='flex-[5]'>
        <div>
          <video className='max-h-[720px] w-[100%] object-[cover]' src={vodeo?.videoUrl} controls/>
        </div>
        <h1 className='font-[700] text-[21px] mt-[20px] mb-[10px]'>{vodeo?.title}</h1>
        <div className='flex items-center justify-between'>
          <span className='font-[450]'>{vodeo?.views} views . {format(vodeo?.createdAt)}</span>
          <div className='flex gap-5 font-[500] text-[20px]'>
            <button onClick={handleLike} className='flex items-center gap-[5px] cursor-pointer'>
              {vodeo?.likes.includes(currentUser?._id) ? <MdThumbUp/> : <MdOutlineThumbUpOffAlt/>}{vodeo?.likes.length}
            </button>
            <button onClick={handleDislike} className='flex items-center gap-[5px] cursor-pointer'>
              {vodeo?.dislikes.includes(currentUser?._id) ? <MdThumbDownAlt/> : <MdOutlineThumbDownOffAlt/>}{vodeo?.dislikes.length} Dislike
            </button>
            <button className='flex items-center gap-[5px] cursor-pointer'><RiShareForwardFill/>share</button>
            <button className='flex items-center gap-[5px] cursor-pointer'><MdOutlineAddTask/>save</button>
          </div>
        </div>
        <hr className='border-[0.5px] border-gray-400 my-[15px] mx-0'/>
        <div className='flex justify-between'>
          <div className='flex items-center gap-5'>
            <img className='w-[50px] h-[50px] rounded-[50%] bg-[#999]' src={creator?.image} alt='/' />
            <div>
              <h1 className='font-[500] text-[20px] '>{creator?.userName}</h1>
              <h1 className='font-[450] mt-1 mb-5 text-[14px]'>{creator?.subscribers} subscribers</h1>
              <p className='font-[500]'>{vodeo?.desc}</p>
            </div>
          </div>
          <button onClick={handleSubscribe} className='uppercase py-[10px] px-[20px] cursor-pointer h-[max-content] bg-[#e82203] font-[500] rounded-[3px] text-white'>
            {updatedUser?.subscribedUsers?.includes(creator?._id) ? 'subscribed' : 'subscribe'}
          </button>
        </div>
        <hr className='border-[0.5px] border-gray-400 my-[15px] mx-0'/>
        <Comments vodeo={vodeo}/>
      </div>
      <div className='flex-[2]'>
        {recommandedVideos?.map((recommandedVideo) => (
          <VideoCard type='sm' recommandedVideo={recommandedVideo} key={recommandedVideo?._id}/>
        ))}
      </div>
    </div>
  )
}

export default VideoDetails





































































































































































{/* <iframe
   width="100%"
   height="720"
   src={video?.videoUrl}
   title="YouTube video player"
   frameBorder="0"
   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   allowFullScreen
 ></iframe> */}