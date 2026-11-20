const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const c = require('../controllers/contractController');
router.use(protect);
router.post('/', c.createContract);
router.get('/', c.listContracts);
router.patch('/:id/status', c.updateContractStatus);
module.exports = router;
