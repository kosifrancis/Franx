const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true, maxlength: 500 },
    relatedId: { type: mongoose.Schema.Types.ObjectId },
    readAt: { type: Date, default: null }
}, { timestamps: true });
module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
