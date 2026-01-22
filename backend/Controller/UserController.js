import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { OTPgenreate, sendVerificationEmail, strogae } from "../others/Emailverification.js";
import { UserModel } from "../Models/UserModel.js";
export const RegisterUser = async(req, res) => { 

    try {
        const {email,password,name,phone,otp,profile} = req.body;

        if(!email || !password || !name || !phone || !otp){
            return res.status(400).json({ message: "All fields are required" });
        }

        const storedOtp = strogae.get(email);

        if(storedOtp.otp != otp){
            return res.status(400).json({ message: "Invalid OTP" });
        }
        if(storedOtp.expiry < Date.now()){
            return res.status(400).json({ message: "OTP expired" });
        }

        const exitingUser = await UserModel.findOne({ email });

        if(exitingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email,
            password:hashpassword,
            name,
            phone,
            profile
        });

        await newUser.save();
            strogae.delete(email);
        return res.status(200).json({ message: "User registered successfully",newUser });

    } catch (error) {
        
    }
}


export const VerifyEmail = async(req, res) => {

    try {
        const { email} = req.body;

        
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        const otp = OTPgenreate();
    const expiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        strogae.set(email, { otp, expiry });

    await sendVerificationEmail(email, otp)

            return res.status(200).json({ message: "OTP sent to email" });  

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
        

    }
}

export const LoginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await UserModel.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId:user._id},process.env.JWT_SECRET,{ expiresIn:'1h' });

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge:3600000
        });

        return res.status(200).json({ message: "Login successful", user, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

export const logout = async(req, res) => {
  try {
    // Get user from req.user (set by auth middleware)
    const userId = req.user.userId;

    const user = await UserModel.findById(userId).select('name');

    // Clear the JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict", // must match login cookie
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    if (user && user.name) {
      return res.status(200).json({
        message: `Logout successful. Goodbye, ${user.name}!`,
        name: user.name,

      });
    } else {
      return res.status(200).json({
        message: "Logout successful.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const GetUserProfile = async(req,res)=>{
    try {
        const userId  = req.user.userId;

        const user = await UserModel.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
        
    }
}