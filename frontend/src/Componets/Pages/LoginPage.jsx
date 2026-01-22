import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import axios from 'axios';

const LoginPage = () => {

        const [loading, setLoading] = useState(false);
        const navigation = useNavigate();
        const [form, setForm] = useState({
        email: "",
        password: "",
       
        })
    
    
        const handleChange = (e) => {
            setForm({... form, [e.target.name]: e.target.value});
        }
    
        const UserLogin = async (e) => {
                    e.preventDefault();
        
                    try {
                        const res = await axios.post("https://emarket-22.onrender.com/user/login", form,{
                            headers: {
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        });
                        localStorage.setItem("token", res.data.token,res.data.user);
                        alert(res.data.message);
                        setLoading(true)
                        setForm(res.data)
                        localStorage.setItem("userInfo",JSON.stringify(res.data.user));
                        navigation('/')
                    } catch (error) {
                        console.log(error);
                        alert(error.response?.data?.message || "login failed");
                        alert("login failed");
                        
                    }
                }
        
  return (

    <div>
        <Header/>   
   <div className='w-full h-screen flex justify-center bg-[rgb(240,229,208)] items-center'>

        <div className=' bg-[rgb(100,4,57)] h-full p-4 rounded-lg shadow-md w-[50%]  overflow-hidden'>
            <h1 className="text-2xl font-bold text-center shadow-xl shadow-amber-800 w-fit trans  ml-50 rounded-md bg-amber-400 p-2 text-shadow-blue-900  mb-2">User Registration</h1>
                    <form onSubmit={UserLogin} className='space-y-2 h-auto ml-16 mt-5 border border-[rgba(14,3,9,0.26)]  bg-[rgb(64,155,135)] p-4 rounded-lg  w-full max-w-lg'>

                    <label htmlFor="email">Email:</label>
                    <input  type="email" id="email" name="email" className='w-full p-2 border rounded' onChange={handleChange} value={form.email} />
                    
                    <label htmlFor="password">Password:</label>
                    <input onChange = {handleChange} value={form.password} type="password" id="password" name="password" className='w-full p-2 border rounded' />
                 
                    <button type="submit" className='w-full bg-blue-500 text-white py-2 mt-3 rounded hover:bg-blue-600'>Register</button>
        </form>
        </div>



    </div>
    </div>

  )
}

export default LoginPage