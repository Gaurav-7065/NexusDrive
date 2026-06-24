import express from 'express'
import verifyToken from '../middleware/verifyToken.js';
import isCoordinator from '../middleware/isCoordinator.js';
import { jobController } from '../controllers/job.controller.js';

const router=express.Router();
// create Job
router.post('/',verifyToken,isCoordinator,jobController.createJob);

// get job
router.get("/",verifyToken,jobController.getJobs);
router.get("/:id",verifyToken,jobController.getJobById)
router.patch('/:id/status',verifyToken,isCoordinator,jobController.JobStatus);
router.get('/:jobId/applicants',verifyToken,isCoordinator,jobController.getApplicantByJob)

export default router;