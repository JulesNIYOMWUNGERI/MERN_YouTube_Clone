import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    userName: { 
        type:String, 
        required:true, 
    },
    email: { 
        type:String, 
        required:true, 
    },
    password: { 
        type:String, 
    },
    image: { 
        type:String 
    },
    subscribers: { 
        type:Number,
         default:0
    },
    subscribedUsers: {
         type:[String],
         default:[]
    },
    fromGoogle: {
        type:Boolean,
        default:false
    }
},
{timestamps:true}
);

export default mongoose.model('User',userSchema);