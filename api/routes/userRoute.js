import express from 'express';
import test, { updateUser , deleteUser, signOut, getUser , adminDel, validUser} from '../Controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.get("/test", test);
router.put("/update/:userid",verifyUser, updateUser);
router.delete("/delete/:userid",verifyUser, deleteUser)
router.post('/signout',signOut);
router.get('/getuser',verifyUser, getUser);
router.delete('/deleteUser/:userid/:usertodel',verifyUser, adminDel );
router.get("/validuser", verifyUser, validUser);
export default router