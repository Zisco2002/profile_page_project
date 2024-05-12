
import express from 'express';
import { getActivityByID } from '../controllers/activities.js';
import { verifyToken } from '../middleware/auth.js';

const ActivitiesRouter = express.Router();

ActivitiesRouter.get('/:userId', getActivityByID);


export default ActivitiesRouter;