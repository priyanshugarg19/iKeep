import  express  from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {createComment, getComments, likeComment} from "../Controllers/commentController.js"
const router= express.Router();

router.post('/create', verifyUser, createComment);
router.get('/getcomments/:postId', getComments);
router.put('/commentlike/:commentid', verifyUser, likeComment);
export default router;
