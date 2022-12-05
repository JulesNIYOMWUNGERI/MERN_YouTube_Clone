import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import User from '../model/User.js';


export const signIn = async(req,res) => {
    const { email,password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({message:"User don't exist"});

        const isPasswordCorrect = bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:'Wrong credentials'});

        const token = jwt.sign({ email:existingUser.email, id:existingUser._id },'test',{ expiresIn:'2h' });

        res.status(200).json({ result:existingUser, token });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const signUp = async(req,res) => {
    const { firstName,lastName,email,password,comfirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({message:'User allready exist.! SignIn instead!!'});

        if(password !== comfirmPassword) return res.status(400).json({message:"password don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email,password:hashedPassword,userName:`${firstName} ${lastName}`});

        const token = jwt.sign({ email:result.email, id:result._id },'test',{ expiresIn:'2h' });

        res.status(200).json({ result,token });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const googleSignIn = async(req,res) => {
    const { email,userName,image } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            const token = jwt.sign({ email:existingUser.email, id:existingUser._id },'test',{ expiresIn:'2h' });

            res.json({result:existingUser,token})
        }else {
            const newUser = await User.create({ email,userName,image,fromGoogle:true });

            const token = jwt.sign({ email:newUser.email, id:newUser._id },'test',{ expiresIn:'2h' });

            res.json({result:newUser, token});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
