import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router();

import { createComment,getComment } from '../controllers/commentController.js'

router.post('/send',auth,createComment);
router.get('/find/:id',getComment)



export default router