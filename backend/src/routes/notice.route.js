import  express from 'express'
import { NoticeController } from '../controllers/notice.controller.js';
import verifyToken from '../middleware/verifyToken.js';
import isCoordinator from '../middleware/isCoordinator.js';

const router=express.Router();

router.post('/post-notification',verifyToken,isCoordinator,NoticeController.createNotice);
router.get('/getallNotification',verifyToken,NoticeController.getAllNotice);

export default router;