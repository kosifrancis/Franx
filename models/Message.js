const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' },
    body: { type: String, required: true, trim: true, maxlength: 5000 },
    readAt: { type: Date, default: null }
}, { timestamps: true });
module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);
