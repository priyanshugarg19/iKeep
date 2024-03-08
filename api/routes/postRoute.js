import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { create, deletepost,getPosts } from "../Controllers/postController.js";

const router = express.Router();

router.post('/create', verifyUser, create )
router.get('/getposts', getPosts);
router.delete("/deletepost/:userId/:postId", verifyUser, deletepost);
export default router;
