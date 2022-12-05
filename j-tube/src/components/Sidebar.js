import React from 'react'
import image from '../images/youtube log.png'
import {AiFillHome,AiOutlineHistory,AiOutlineSetting,AiOutlineFlag} from 'react-icons/ai';
import {HiOutlineUserCircle} from 'react-icons/hi';
import {
    MdOutlineExplore,
    MdOutlineSubscriptions,
    MdOutlineVideoLibrary,
    MdOutlineLibraryMusic,
    MdSportsBasketball,
    MdOutlineSportsEsports,
    MdOutlineMovie,
    MdOutlineArticle,
    MdOutlineLiveTv,
    MdOutlineHelpOutline,
    MdBrightnessMedium
} from 'react-icons/md';
import { Link } from 'react-router-dom';



const Sidebar = ({theme,setTheme}) => {
    const user = JSON.parse(localStorage.getItem('profile'))?.result;

    const handleTheme = () =>{
        setTheme(!theme)
    }

  return (
    <div className={theme ? 'flex-[1.5] bg-[#101010] h-[100vh] text-[#f7f8f7ff] text-xl sticky top-0 overflow-y-auto' : 'flex-[1.5] bg-[#f7f8f7ff] h-[100vh] text-[#181818] font-[500] text-xl sticky top-0 overflow-y-auto'}>
        <Link to="/" style={{textDecoration:'none', color:'inherit'}}>
         <div className={theme ? 'flex items-center bg-black text-[#f7f8f7ff]  gap-[5px] font-bold py-[18px] mb-[25px] sticky top-0' : 'flex items-center bg-white text-[#181818]  gap-[5px] font-bold py-[18px] mb-[25px] sticky top-0'}>
            <img className='h-[30px] pl-[26px]' src={image} alt='/'/>
             <h1 className='cursor-pointer'>KendixTube</h1>
         </div>
         </Link>
        <div className='py-[18px] px-[26px]'>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <AiFillHome />
                Home
            </div>
            <Link to='/trends' style={{textDecoration:"none"}}>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineExplore />
                Explore
            </div>
            </Link>
            <Link to='/subscriptions' style={{textDecoration:"none"}}>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineSubscriptions />
                Subscriptions
            </div>
            </Link>
            <div className='my-[15px] mx-[0px] border-[0.5px] border-[#373737]' />
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineVideoLibrary />
                Library
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <AiOutlineHistory />
                History
            </div>
            <div className='my-[15px] mx-[0px] border-[0.5px] border-[#373737]' />
            {!user && <><div className='cursor-pointer'>
                Login to like videos, comment, and subscribe.
                <Link to='/auth' style={{textDecoration:"none"}}>
                  <button className='flex items-center border-[0.5px] border-[#3ea6ff] bg-transparent text-[#3ea6ff] gap-2 py-2 px-4 rounded-[3px] font-[500] mt-[10px] cursor-pointer uppercase'>
                    <HiOutlineUserCircle size={30}/>
                    LogIn
                  </button>
                </Link>
            </div>
            <div className='my-[15px] mx-[0px] border-[0.5px] border-[#373737]' /></>}
            <h2 className='text-xl font-[500] text-[#aaaaaa] mb-[20px] uppercase'>
                best of KendixTube
            </h2>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineLibraryMusic />
                Music
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdSportsBasketball />
                Sport
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineSportsEsports />
                Gaming
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineMovie />
                Movies
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineArticle />
                News
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineLiveTv />
                Live
            </div>
            <div className='my-[15px] mx-[0px] border-[0.5px] border-[#373737]' />
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <AiOutlineSetting />
                Settings
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <AiOutlineFlag />
                Report
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]'>
                <MdOutlineHelpOutline />
                Help
            </div>
            <div className='flex items-center gap-[20px] cursor-pointer py-[7.5px] px-[0px] hover:bg-[#9999]' onClick={handleTheme}>
                <MdBrightnessMedium />
                {theme ? 'Light' : 'Dark'} Mode
            </div>
        </div>
    </div>
  )
}

export default Sidebar