import User from '../model/User.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Video from '../model/Video.js';



export const getUser = async(req,res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

export const updateUser = async(req,res) => {
    const { id } = req.params;
    const { userName,email,password } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with this id:${id}`)

    if(id !== req.userId) return res.status(404).send('you are not allowed to update this user');

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = { userName,email,password:hashedPassword,_id:id };

    await User.findByIdAndUpdate(id, updatedUser, { new: true });

    res.json({updatedUser});

};

export const deleteUser = async(req,res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id:${id} `);

    if(id !== req.userId) return res.status(404).send('you are not allowed to delete this user');

    await User.findByIdAndRemove(id);

    res.json({message:'user deleted successfully'})    
};

export const subscribe = async(req,res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(req.userId,{
            $push: {subscribedUsers:id}
        })

        await User.findByIdAndUpdate(id,{
            $inc: {subscribers:1}
        })

        res.status(200).json("Subscription Successfull")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

export const unsubscribe = async(req,res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndUpdate(req.userId,{
            $pull: {subscribedUsers:id}
        })

        await User.findByIdAndUpdate(id,{
            $inc: {subscribers:-1}
        })

        res.status(200).json("Unsubscription Successfull")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

export const like = async(req,res) => {
    const id = req.userId;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        });

        res.status(200).json({message:'The video has been liked'});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

export const dislike = async(req,res) => {
    const id = req.userId;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        });

        res.status(200).json({message:'The video has been disliked'});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};