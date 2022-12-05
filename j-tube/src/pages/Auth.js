import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {googleSignIn, signIn,signUp} from '../actions/auth';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { AUTH } from '../constants/ActionType';

const Auth = ({theme}) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({ firstName:'',lastName:'',email:'',password:'',comfirmPassword:''})

    const handleSwitch = () => {
        setIsSignUp(!isSignUp)
    }

    const handleChange = (e) => {
      setFormData({ ...formData,[e.target.name]:e.target.value })

    }

    const handleSubmit = (e) => {
      e.preventDefault();
      
      if(isSignUp) {
        dispatch(signUp(formData,history))
      }else {
        dispatch(signIn(formData,history))
      }
    }

    const googleSuccess = (response) => {
      const decoded = jwt_decode(response.credential)


      const result ={
        id:decoded?.sub,
        userName:decoded?.name,
        email:decoded?.email,
        image:decoded?.picture,
      }

      const token = response?.credential;

      try {
        dispatch(googleSignIn(result,history));


      } catch (error) {
        console.log(error)
      }
      
    }

    const googleFailure = () => {
      console.log('Error');
        console.log('Google Sign In Was UnSuccessfully!. Try Again Later')
    }


  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-65px)]'>
        <div className={theme ? 'flex items-center flex-col bg-black text-white py-[20px] px-[50px] border border-[#241f1f] gap-[10px]' : 'flex items-center flex-col bg-white text-black py-[20px] px-[50px] border border-[#f3eeee] gap-[10px]'}>
           <h1 className='font-[800] text-[30px]'>{isSignUp ? 'SignUp' : 'SignIn'}</h1>
           <h2 className='font-[700] text-[20px]'>to continue to KendixTube</h2>
           {isSignUp && <div className='flex gap-2'>
                          <input className='bg-transparent border border-[#ebe9e9] px-[10px] py-[15px] w-[100%] rounded' type='text' name='firstName' placeholder='FirstName' value={formData.firstName} onChange={handleChange} half="true"/>
                          <input className='bg-transparent border border-[#ebe9e9] px-[10px] py-[15px] w-[100%] rounded' type='text' name='lastName' placeholder='LastName' value={formData.lastName} onChange={handleChange} half="true"/>
                        </div>}
           <input className='bg-transparent border border-[#ebe9e9] px-[10px] py-[15px] w-[100%] rounded' type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange}/>
           <input className='bg-transparent border border-[#ebe9e9] px-[10px] py-[15px] w-[100%] rounded' type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange}/>
          {isSignUp && <input className='bg-transparent border border-[#ebe9e9] px-[10px] py-[15px] w-[100%] rounded' type="password" name='comfirmPassword' placeholder='ComfirmPassword' value={formData.comfirmPassword} onChange={handleChange}/>}
           <button onClick={handleSubmit} className={theme ? 'font-[700] text-[20px] rounded-[3px] py-[10px] px-[20px] bg-white text-black' : 'font-[700] text-[20px] rounded-[3px] py-[10px] px-[20px] bg-black text-white'}>
             {isSignUp ? "SignUp" : "SignIn"}
           </button>
           <GoogleLogin 
             onSuccess={googleSuccess}
             onError={googleFailure}
           />
           <button className={theme ? 'font-[500] bg-[#201f1f] py-[8px] px-[10px]' : 'font-[500] bg-[#f3efef] py-[8px] px-[10px]'} onClick={handleSwitch}>
            {isSignUp ? "Allready Have An Account SignIn" : "Don't Have An Account SignUp"}
           </button>
        </div>
        <div className='flex  font-[500]'>
            <h1>English(USA)</h1>
            <div className={isSignUp ? 'ml-[180px]' : 'ml-[25px]'}>
                <Link className='ml-[30px]'>help</Link>
                <Link className='ml-[30px]'>privacy</Link>
                <Link className='ml-[30px]'>terms</Link>
            </div>
        </div>
    </div>
  )
}

export default Auth