import mongoose from 'mongoose';


const videoSchema = mongoose.Schema({
    creatorId: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true  
    },
    desc: { 
        type: String, 
        required: true 
    },
    imgUrl: { 
        type: String,
        require: true
    },
    videoUrl: { 
        type: String, 
        required: true 
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type:[String]
    },
    likes: {
        type:[String],
        default:[]
    },
    dislikes: {
        type:[String],
        default:[]
    }
},
{timestamps:true}
)

export default mongoose.model('Video',videoSchema);