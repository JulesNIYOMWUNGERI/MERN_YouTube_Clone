import Video from '../model/Video.js'
import Comment from '../model/Comment.js'



// export const addComment = async(req,res) => {
//     const { id } = req.params;
//     const {finalComment}  = req.body;

//     console.log(finalComment)
//     console.log(id)

//     try {
//         const UpdatedComment = await Comment.findByIdAndUpdate(id,{
//             $push:{comments:finalComment}
//         },{ new:true })

//         res.status(200).json(UpdatedComment)
//     } catch (error) {
//         res.status(500).json({message:error.message})
//     }
// };

export const createComment = async(req,res) => {
    const comment = req.body;

    const newComment = new Comment({ ...comment, creatorId:req.userId })
    try {
        const savedComment = await newComment.save();

        res.status(200).json(savedComment);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
};

export const getComment = async(req,res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.find({videoId:id});

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

export const deleteComment = async(req,res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        const video = await Video.find({creatorId:req.userId});
        if(req.userId === comment.creatorId || req.userId === video.creatorId) {
            await Comment.findByIdAndDelete(id);
            res.status(200).json('comment has been deleted successfull')
        }else {
            res.status(404).json('you can delete only your comment')
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}