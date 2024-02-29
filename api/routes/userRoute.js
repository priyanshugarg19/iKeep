import express from 'express';
import test, { updateUser } from '../Controllers/userController.js';
import { verifyUser } from '../utils/verifyUser.js';
const router = express.Router();

router.get("/test", test);
router.put("/update/:userid",verifyUser, updateUser);


export default router