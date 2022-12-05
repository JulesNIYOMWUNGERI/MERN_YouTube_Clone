import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getCommentCreator } from '../actions/user'
import {format} from 'timeago.js'
import { useLocation } from 'react-router-dom'



const Comment = ({comment}) => {
  const dispatch = useDispatch();
  const location = useLocation();




  return (
    <div className='flex gap-[10px] items-center my-[30px] mx-0'>
        <img className='w-[36px] h-[36px] rounded-[50%] bg-[#999]' src={comment?.creatorImg} alt='/' />
        <div className='gap-[10px]'>
            <h1 className='font-[500] flex gap-2 mb-2'>{comment?.creatorName}<span className='font-[400]'>{format(comment?.createdAt)}</span></h1>
            <p className='font-[450]'>{comment?.desc}</p>
        </div>
    </div>
  )
}

export default Comment