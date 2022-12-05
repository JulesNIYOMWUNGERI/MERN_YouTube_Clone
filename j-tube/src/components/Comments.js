import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import { getComment, sendComment } from '../actions/video'
import Comment from './Comment'


const Comments = ({vodeo}) => {
  const user = JSON.parse(localStorage.getItem('profile'))?.result;
  const { id } = useParams()
  const [comment,setComment] = useState({desc:'',creatorName:user?.userName,creatorImg:user?.image,videoId:id})
  
  const dispatch = useDispatch();
  const history = useNavigate();
  


useEffect(()=>{
  if(id) dispatch(getComment(id))
},[id])

const { comments } = useSelector((state) => state.videos)


  


  const submitComment = () => {

    dispatch(sendComment(comment,id));

    setComment({...comment,desc:''})

  }



  return (
    <div>
        <div className='flex items-center gap-[10px]'>
          <img className='w-[36px] h-[36px] rounded-[50%] bg-[#999]' src={user?.image} alt='/' />
            <input className='bg-transparent border-b border-b-[#999] outline-none p-[5px] w-[70%]' name='comment' type='text' value={comment?.desc} placeholder='Add a Comment....' onChange={(e) => setComment({ ...comment,desc:e.target.value })} />
            <button onClick={submitComment} className='uppercase py-[10px] px-[20px] cursor-pointer h-[max-content] bg-[#e82203] font-[500] rounded-[3px] text-white'>send Comment</button>
        </div>
        {comments?.map((comment) => (
          <Comment key={comment?._id} comment={comment} />
        ))}
    </div>
  )
}

export default Comments