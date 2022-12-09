import { Router } from 'express';
const router = Router({ mergeParams: true });

import v1Router from './v1/routes/main.route.js';

router.use('/v1', v1Router);

export default router;
