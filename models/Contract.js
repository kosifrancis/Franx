const mongoose = require('mongoose');
const contractSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
    amount: { type: Number, required: true, min: 0 },
    terms: { type: String, trim: true, maxlength: 10000 },
    status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' }
}, { timestamps: true });
module.exports = mongoose.models.Contract || mongoose.model('Contract', contractSchema);
