import React, {useState,useEffect} from 'react'
import VideoCard from '../components/VideoCard'
import {useDispatch,useSelector} from 'react-redux'
import { getVideos } from '../actions/video'
import { useLocation } from 'react-router-dom'

const Home = ({type,theme}) => {
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(()=>{
    if(type) dispatch(getVideos(type));
  },[type])


  const {videos} = useSelector((state) => state.videos)
  console.log(videos)

  return (
    <div className='flex justify-between flex-wrap'>
      {videos?.map((video) => (
        <VideoCard key={video._id} video={video} theme={theme}/>
      ))}
      
    </div>
  )
}

export default Home