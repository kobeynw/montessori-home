const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController');

// Get all activities with filters and pagination
router.get('/', ActivityController.getActivities);

// Get all categories
router.get('/categories', ActivityController.getCategories);

// Get single activity by ID
router.get('/:id', ActivityController.getActivity);

module.exports = router;