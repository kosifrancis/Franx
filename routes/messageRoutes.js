const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const c = require('../controllers/messageController');
router.use(protect);
router.post('/', c.sendMessage);
router.get('/:userId', c.listConversation);
module.exports = router;
