const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    proposal: { type: String, required: true, trim: true, maxlength: 10000 },
    proposedRate: { type: Number, min: 0 },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'withdrawn'], default: 'pending' }
}, { timestamps: true });
applicationSchema.index({ job: 1, freelancer: 1 }, { unique: true });
module.exports = mongoose.models.Application || mongoose.model('Application', applicationSchema);
