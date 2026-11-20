const Notification = require('../models/Notification');
const listNotifications = async (req, res) => res.json(await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 }).limit(100));
const markRead = async (req, res) => {
    const notification = await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user._id }, { readAt: new Date() }, { new: true });
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    return res.json(notification);
};
module.exports = { listNotifications, markRead };
