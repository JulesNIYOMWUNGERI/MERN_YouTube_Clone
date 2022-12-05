import React, {useState,useEffect} from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { createVideo, getVideoById, updateVideo } from '../actions/video';
import { useNavigate } from 'react-router-dom'


const Upload = ({setOpen,setUpdate,theme,type,videoId}) => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [imagePrc, setImagePrc] = useState(0);
    const [videoPrc, setVideoPrc] = useState(0);
    const [inputs, setInputs] = useState({tags:'',desc:'',title:'',imgUrl:'',videoUrl:''});
    const handleChange = (e) => {
      setInputs({ ...inputs, [e.target.name] : e.target.value })
    }


    const uploadFile = (file,urlType) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          urlType === 'imgUrl' ? setImagePrc(Math.round(progress)) : setVideoPrc(Math.round(progress))
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
        }, 
        (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setInputs({ ...inputs, [urlType] : downloadURL })
            });
          }
      );
    }

    useEffect(() => {
      video && uploadFile(video, "videoUrl")
    },[video]);
    useEffect(() => {
      image && uploadFile(image, "imgUrl")
    },[image]);


    const handleSubmit = async(e) => {
      e.preventDefault();

      if(type === "upload") {
        dispatch(createVideo(inputs,type="random"))
        setOpen(false)
        setInputs({tags:'',desc:'',title:'',imgUrl:'',videoUrl:''})
      }else {
        dispatch(updateVideo(inputs,videoId,type="random"))
        setUpdate(false)
        setInputs({tags:'',desc:'',title:'',imgUrl:'',videoUrl:''})
      }

      
    }


    useEffect(() => {
      if(type === "update") dispatch(getVideoById(videoId))
    },[type]);

    const { vodeo } = useSelector((state) => state.videos)


    useEffect(() => {
      if(vodeo) setInputs(vodeo)
    },[vodeo])
    

    const handleClose = () => {
      if(type === "update") {
        setUpdate(false)
      }else {
        setOpen(false)
      }
    }


  return (
    <div className='w-[100%] h-[100%] absolute top-0 left-0 bg-[#000000a7] flex items-center justify-center'>
        <div className={theme ? 'w-[650px] h-[750px] bg-[#202020] p-[20px] flex flex-col gap-[20px] relative' : 'w-[650px] h-[750px] bg-[#f7f8ff] p-[20px] flex flex-col gap-[20px] relative'}>
            <MdOutlineClose className='absolute top-[10px] right-[10px] cursor-pointer'  onClick={handleClose} size={30}/>
            <h1 className='text-center font-[800] text-[35px]'>{type === "upload" ? 'Upload any video' : `Update "${vodeo?.title}"`}</h1>
            <label className='font-bold text-[20px]'>Image:</label>
            {videoPrc > 0 ? ("Uploading" + videoPrc + "%") : (<input type='file' accept='video/*' className='border border-[#9999] rounded-[3px] p-[10px] bg-transparent' onChange={(e) => setVideo(e.target.files[0])}/>)}
            <input value={inputs.title} type='text' name='title' placeholder='Title' className='border border-[#9999] rounded-[3px] p-[10px] bg-transparent' onChange={handleChange}/>
            <textarea value={inputs.desc} type='text' name='desc' placeholder='Description' rows={8} className='border border-[#9999] rounded-[3px] p-[10px] bg-transparent' onChange={handleChange}/>
            <input value={inputs.tags} type='text' name='tags' placeholder='Tags(Separete with commas.)' className='border border-[#9999] rounded-[3px] p-[10px] bg-transparent' onChange={(e) => setInputs({ ...inputs, [e.target.name]:e.target.value.split(",")})}/>
            <label className='font-bold text-[20px]'>Image:</label>
            {imagePrc > 0 ? ("Uploading" + imagePrc + "%") : (<input type='file' accept='image/*' className='border border-[#9999] rounded-[3px] p-[10px] bg-transparent' onChange={(e) => setImage(e.target.files[0])}/>)}
            <button onClick={handleSubmit} className={theme ? 'rounded-[3px] py-[10px] px-[20px] font-[700] cursor-pointer bg-white text-black uppercase' : 'rounded-[3px] py-[10px] px-[20px] font-[700] cursor-pointer bg-black text-white uppercase'}>
              {type === 'update' ? 'update' : 'upload'}
            </button>
        </div>
    </div>
  )
}

export default Upload