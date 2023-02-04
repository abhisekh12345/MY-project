import express from 'express'
const router = express.Router()

import {createjob,deleteJob,getALLjobs,updateJob,showStats} from '../controllers/jobsController.js'


router.route('/').post(createjob).get(getALLjobs)
//place before:id//
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router;
