import User from "../model/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt   from "bcryptjs/dist/bcrypt.js";

export const userLogin = async(req,res)=>{
   try {
    const {username , password} = req.body;
    if(!username || !password) {
       return res.status(422).json({message:"Fill in all Fields"});
    }
    
    const user = await User.findOne({username})
    if(!user){
        return res.status(422).json({message:"Username does not found"});
    }

    const comparePass = await bcrypt.compare(password,user.password);
    if(!comparePass){
      return  res.status(422).json({message:"password not matched"});
    }
    const {_id:id } = user;
    const token = await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"})

    res.status(200).json({token,id,username})
   } catch (error) {
    console.log("this error occurd in userLogin controller",error.message)
    res.status(422).json({error:"interal server error occured"})
   }
}

export const userSignup = async(req,res)=>{
    try {
        const {fullName , username , password , confirmPassword } = req.body;
        if(!fullName || !username || !password || !confirmPassword){
           return res.status(422).json({message:"fill in all fields"});
        }
        if(password.length < 6){
            return res.status(422).json({message:"password must be of length 6"})
        }
        if(username.length < 3){
            return res.status(422).json({message:"Username must contain 3 letters"})
        }
        if(password!=confirmPassword){
           return res.status(422).json({message:"password does not matched"});
        }
        const user = await User.findOne({username})
        if(user){
           return res.status(422).json({message:"username already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hassPass = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            fullName,
            username,
            password:hassPass,
        })
        if(newUser){
            await newUser.save();
        }
        res.status(201).json({ message: `New user ${newUser.username} registered`, user: newUser });

    } catch (error) {
        console.log("error in userLogin controller",error.message)
        res.status(422).json({error:"Internal server error"})
    }
}

