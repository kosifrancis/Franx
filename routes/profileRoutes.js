const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const c = require('../controllers/profileController');
router.get('/me', protect, c.getMyProfile);
router.patch('/me', protect, c.updateMyProfile);
router.get('/:id', c.getProfile);
module.exports = router;
