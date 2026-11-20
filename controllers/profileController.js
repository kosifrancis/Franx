const User = require('../models/User');
const safeFields = 'fullName role companyName companyDescription companyLocation professionalTitle specialties skills experienceLevel portfolioUrl hourlyRate bio createdAt';
const getMyProfile = async (req, res) => res.json(req.user);
const getProfile = async (req, res) => {
    const user = await User.findById(req.params.id).select(safeFields);
    if (!user) return res.status(404).json({ message: 'Profile not found' });
    return res.json(user);
};
const updateMyProfile = async (req, res) => {
    const allowed = ['fullName', 'phoneNumber', 'companyName', 'companyDescription', 'companyLocation', 'professionalTitle', 'specialties', 'skills', 'experienceLevel', 'portfolioUrl', 'hourlyRate', 'bio'];
    const changes = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const user = await User.findByIdAndUpdate(req.user._id, changes, { new: true, runValidators: true }).select('-password');
    return res.json(user);
};
module.exports = { getMyProfile, getProfile, updateMyProfile };
