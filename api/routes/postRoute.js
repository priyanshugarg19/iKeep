import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { create, deletepost,getPosts , updatePost } from "../Controllers/postController.js";

const router = express.Router();

router.post('/create', verifyUser, create )
router.get('/getposts', getPosts);
router.delete("/deletepost/:userId/:postId", verifyUser, deletepost);
router.post('/update/:userId/:postId', verifyUser, updatePost )
export default router;
