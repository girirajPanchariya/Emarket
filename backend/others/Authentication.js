import jwt from 'jsonwebtoken';


export const jwtTokenGenerateor = async (req,res,next) => {
    try {
        const token  = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in jwtTokenGenerateor middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}