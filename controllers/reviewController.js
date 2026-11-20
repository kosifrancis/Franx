const Review = require('../models/Review');
const Contract = require('../models/Contract');
const listUserReviews = async (req, res) => res.json(await Review.find({ reviewee: req.params.userId }).populate('reviewer', 'fullName').sort({ createdAt: -1 }).limit(100));
const createReview = async (req, res) => {
    const contract = await Contract.findOne({ _id: req.body.contract, status: 'completed', $or: [{ employer: req.user._id }, { freelancer: req.user._id }] });
    if (!contract) return res.status(404).json({ message: 'Completed contract not found' });
    const reviewee = String(contract.employer) === String(req.user._id) ? contract.freelancer : contract.employer;
    return res.status(201).json(await Review.create({ contract: contract._id, reviewer: req.user._id, reviewee, rating: req.body.rating, comment: req.body.comment }));
};
module.exports = { listUserReviews, createReview };
