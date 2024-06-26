import express from "express";
import { test } from "../controller/user-controller.js";

const userRoute = express.Router();

userRoute.get('/test', test);

export default userRoute;