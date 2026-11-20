const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const c = require('../controllers/reviewController');
router.get('/user/:userId', c.listUserReviews);
router.post('/', protect, c.createReview);
module.exports = router;
