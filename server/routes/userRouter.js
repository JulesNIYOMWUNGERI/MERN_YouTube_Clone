import express from 'express';

const router = express.Router();

import { getUser,updateUser,deleteUser,subscribe,unsubscribe,like,dislike } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

router.get('/find/:id',getUser);
router.patch('/:id',auth,updateUser);
router.delete('/:id',auth,deleteUser);
router.patch('/sub/:id',auth,subscribe);
router.patch('/unsub/:id',auth,unsubscribe);
router.patch('/like/:videoId',auth,like);
router.patch('/dislike/:videoId',auth,dislike);


export default router;