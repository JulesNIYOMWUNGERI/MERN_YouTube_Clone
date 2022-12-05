import express from 'express';

const router = express.Router();

import { signIn,signUp,googleSignIn } from '../controllers/authController.js';

router.post('/signin',signIn);
router.post('/signup',signUp);
router.post('/google',googleSignIn)

export default router;