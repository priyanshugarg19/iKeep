import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { create } from "../Controllers/postController.js";
import {getPosts} from "../Controllers/postController.js"
const router = express.Router();

router.post('/create', verifyUser, create )
router.get('/getposts', getPosts);
export default router;
