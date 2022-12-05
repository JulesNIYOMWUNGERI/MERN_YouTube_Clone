import mongoose from 'mongoose'


const commentSchema = mongoose.Schema({
    creatorId: {
        type:String,
        required:true
    },
    creatorImg: {
        type:String,
        required:true,
    },
    creatorName: {
        type:String,
        required:true
    },
    desc: {
        type:String,
        required:true
    },
    videoId: {
        type:String,
        required:true
    }
},{timestamps:true}) 


export default mongoose.model('Comment',commentSchema);