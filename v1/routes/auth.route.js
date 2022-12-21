import { Router } from 'express';
import Auth from './../controllers/auth.controller.js'
const router = Router({ mergeParams: true });

router.post('/login', Auth.LogIn)

export default router;
