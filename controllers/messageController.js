const Message = require('../models/Message');
const User = require('../models/User');
const sendMessage = async (req, res) => {
    const recipient = await User.exists({ _id: req.body.recipient });
    if (!recipient || String(req.body.recipient) === String(req.user._id)) return res.status(400).json({ message: 'Valid recipient is required' });
    return res.status(201).json(await Message.create({ sender: req.user._id, recipient: req.body.recipient, contract: req.body.contract, body: req.body.body }));
};
const listConversation = async (req, res) => {
    const messages = await Message.find({ $or: [{ sender: req.user._id, recipient: req.params.userId }, { sender: req.params.userId, recipient: req.user._id }] }).sort({ createdAt: 1 }).limit(500);
    return res.json(messages);
};
module.exports = { sendMessage, listConversation };
