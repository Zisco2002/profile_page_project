import express from "express";
import authRouter from "./auth.route.js";
import ActivitiesRouter from "./activities.route.js";
import userRouter from "./user.route.js";

const apiRoutes=express.Router();

apiRoutes.use('/auth',authRouter);
apiRoutes.use('/activities',ActivitiesRouter);
apiRoutes.use('/users',userRouter)

export default apiRoutes;