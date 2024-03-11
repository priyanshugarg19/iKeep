import express from 'express';
import test, { updateUser , deleteUser, signOut, getUser} from '../Controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.get("/test", test);
router.put("/update/:userid",verifyUser, updateUser);
router.delete("/delete/:userid",verifyUser, deleteUser)
router.post('/signout',signOut);
router.get('/getuser',verifyUser, getUser);
export default router