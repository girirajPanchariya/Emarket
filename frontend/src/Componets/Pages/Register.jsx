import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
const Register = () => {
    const  [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();
    const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    })


    const handleChange = (e) => {
        setForm({... form, [e.target.name]: e.target.value});
    }

    const sendOtp = async () => {
        // if (!form.email) {
        //     return alert("Please enter your email first!");
        // }
        setLoading(true);
        try {
            const response = await axios.post("https://emarket-1-ai90.onrender.com/user/verify", { email: form.email });
            setOtpSent(true);
            alert("OTP sent to your email. It expires in 5 minutes.");
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Error sending OTP");
            setLoading(false);
            
        }

      
    }
      const UserRegister = async (e) => {
            e.preventDefault();

            try {
                const res = await axios.post("https://emarket-1-ai90.onrender.com/user/register", form);
                alert(res.data.message);
                setForm(res.data)
                navigation('/login')
            } catch (error) {
                console.log(error);
                alert(error.response?.data?.message || "Registration failed");
                alert("Registration failed");
                
            }
        }

    

  return (
    <div>
        <Header/>
    <div className='w-full h-screen flex justify-center bg-[rgb(240,229,208)] items-center'>

        <div className=' bg-[rgb(100,4,57)] h-full p-4 rounded-lg shadow-md w-[50%]  overflow-hidden'>
            <h1 className="text-2xl font-bold text-center shadow-xl shadow-amber-800 w-fit trans  ml-50 rounded-md bg-amber-400 p-2 text-shadow-blue-900  mb-2">User Registration</h1>
                    <form onSubmit={UserRegister} className='space-y-2 h-auto ml-16 mt-5 border border-[rgba(14,3,9,0.26)]  bg-[rgb(64,155,135)] p-4 rounded-lg  w-full max-w-lg'>

                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" onChange={handleChange} value={form.name} className='w-full p-2 border rounded' />

                    <label htmlFor="email">Email:</label>
                    <input  type="email" id="email" name="email" className='w-full p-2 border rounded' onChange={handleChange} value={form.email} />
                    {!otpSent ?(<button type="button" onClick={sendOtp} className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>{!loading ? ("Send OTP") : "Sending..."}</button>):(
                 <div>

                     <button type="button" onClick={sendOtp} className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'>{!loading ? "ResSendOTP": "Resending..."}</button>
                         <label htmlFor="otp">OTP:</label>
                        <input onChange = {handleChange} value={form.otp} type="text" id="otp" name="otp" className='w-full p-2 border rounded' /> 
                 </div>
                    )}
                    

                                    
                    <label htmlFor="password">Password:</label>
                    <input onChange = {handleChange} value={form.password} type="password" id="password" name="password" className='w-full p-2 border rounded' />
                    <label htmlFor="phone">Phone:</label>
                    <input onChange = {handleChange} value={form.phone} type="tel" id="phone" name="phone" className='w-full p-2 border rounded' />

                    <button type="submit" className='w-full bg-blue-500 text-white py-2 mt-3 rounded hover:bg-blue-600'>Register</button>
        </form>
        </div>



    </div>
    </div>
  )
}

export default Register































































// import React, { useState } from "react";
// import axios from "axios";

// const Register = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     otp: "",
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Send OTP
//   const sendOtp = async () => {
//     if (!form.email) {
//       return alert("Please enter your email first!");
//     }
//     try {
//       setLoading(true);
//       await axios.post("http://localhost:8080/user/verify", { email: form.email });
//       setOtpSent(true);
//       alert("OTP sent to your email. It expires in 5 minutes.");
//     } catch (error) {
//       alert(error.response?.data?.message || "Error sending OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Register User
//   const registerUser = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!form.name || !form.email || !form.password || !form.phone || !form.otp) {
//       return alert("All fields are required.");
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:8080/user/register", form);
//       alert(res.data.message);

//       // Reset form after successful registration
//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         phone: "",
//         otp: "",
//       });
//       setOtpSent(false);
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex justify-center items-center">
//       <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">User Registration</h1>

//         <form onSubmit={registerUser} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           {!otpSent && (
//             <button
//               type="button"
//               onClick={sendOtp}
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           )}

//           {otpSent && (
//             <>
//               <input
//                 type="text"
//                 name="otp"
//                 placeholder="Enter OTP"
//                 value={form.otp}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />

//               <button
//                 type="button"
//                 onClick={sendOtp}
//                 disabled={loading}
//                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//               >
//                 {loading ? "Resending..." : "Resend OTP"}
//               </button>

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />

//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="Phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
//               >
//                 {loading ? "Registering..." : "Register"}
//               </button>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;