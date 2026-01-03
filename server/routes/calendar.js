const express = require('express');
const router = express.Router();
const CalendarController = require('../controllers/calendarController');

// Get user's calendar
router.get('/', CalendarController.getCalendar);

// Add activity to calendar
router.post('/', CalendarController.addActivity);

// Update calendar entry status
router.put('/:id/status', CalendarController.updateStatus);

// Delete calendar entry
router.delete('/:id', CalendarController.deleteEntry);

// Clear all calendar entries
router.delete('/', CalendarController.clearAll);

module.exports = router;