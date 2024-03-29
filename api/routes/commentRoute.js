import  express  from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {createComment, getComments, likeComment, editComment, deleteComment} from "../Controllers/commentController.js"
const router= express.Router();

router.post('/create', verifyUser, createComment);
router.get('/getcomments/:postId', getComments);
router.put('/commentlike/:commentid', verifyUser, likeComment);
router.put('/commentedit/:commentid', verifyUser, editComment);
router.delete('/commentdelete/:commentid', verifyUser, deleteComment);

export default router;
