import  express  from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {createComment, getComments} from "../Controllers/commentController.js"
const router= express.Router();

router.post('/create', verifyUser, createComment);
router.get('/getcomments/:postId', getComments);

export default router;
