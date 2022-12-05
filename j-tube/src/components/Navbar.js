import React, {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {Link,useNavigate,useLocation} from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { MdOutlineVideoCall,MdOutlineClose } from 'react-icons/md'
import { BiMenu } from 'react-icons/bi'
import { LOGOUT } from '../constants/ActionType'
import Upload from './Upload'
import { getVideoBySearch } from '../actions/video';



const Navbar = ({theme}) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const [search,setSearch] = useState('')
  const [show,setShow] = useState(true)
  const [open,setOpen] = useState(false)
  

  const user = JSON.parse(localStorage.getItem('profile'))

  const handleShow = () => {
    setShow(!show);
  }

  const logout = () => {
    dispatch({ type:LOGOUT })
    history('/')
    setShow(true)
  }

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = jwt_decode(token);
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }


  },[location]);

  const handleSearch = () => {
    if(search.trim()){
      dispatch(getVideoBySearch({ search, tags:'none' }) )    
      history(`/videos/search?searchQuery=${search || 'none'}`)
    }else {
      history('/')
    }
  }



  return (
    <>
    <div className={theme ? 'sticky top-0 bg-black h-[65px]' : 'sticky top-0 bg-white h-[65px]'}>
      <div className='flex items-center justify-end h-[100%] py-0 px-5 relative'>
        <div className='w-[40%] absolute left-0 right-0 m-auto flex items-center justify-between p-1 border-[1px] border-[#ccc] rounded-[3px]'>
          <input className='bg-transparent outline-none w-[100%]' value={search} name='search' placeholder='Search ' onChange={(e) => setSearch(e.target.value)}/>
          <button className='bg-gray-300 py-2 px-2' onClick={handleSearch}><AiOutlineSearch /></button>
        </div>
        {user ?
         (
         <div className='flex items-center gap-[10px] font-[500]'>
           <MdOutlineVideoCall className='cursor-pointer' size={30} onClick={() => setOpen(true)}/>
           <img className='h-[32px] w-[32px] rounded-[50%] bg-[#999]'src={user?.result?.image} />
           {user?.result?.userName}
           {!show && <button onClick={logout} className='uppercase bg-red-600 py-[15px] px-[25px] rounded-[5px] font-bold'>logout</button>}
           <div onClick={handleShow}>
            {show ? <BiMenu size={30}/> : <MdOutlineClose size={30}/>}
          </div>
          </div>
          ) :( <Link to='/auth'style={{textDecoration:"none"}}>
          <button className='flex items-center border-[0.5px] border-[#3ea6ff] bg-transparent text-[#3ea6ff] gap-2 py-2 px-4 rounded-[3px] font-[500] cursor-pointer uppercase'>
            <HiOutlineUserCircle size={30}/>
            LogIn
          </button>
        </Link>)}
      </div>
    </div>
    {open && <Upload setOpen={setOpen} theme={theme} type="upload"/>}
    </>
  )
}

export default Navbar