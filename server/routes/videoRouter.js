import express from 'express';

const router = express.Router();

import { getVideos,getVideoById,getTrendVideos,getSubVideos,getBySearch,createVideo,updateVideo,deleteVideo,addViews } from '../controllers/videoController.js'
import auth from '../middleware/auth.js';




router.post('/',auth,createVideo);
router.patch('/:id',auth,updateVideo);
router.delete('/:id',auth,deleteVideo);
router.patch('/views/:id',addViews);
router.get('/find/:id',getVideoById);
router.get('/random',getVideos);
router.get('/trend',getTrendVideos);
router.get('/sub',auth,getSubVideos);
router.get('/search',getBySearch);





export default router;