const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    description: { type: String, required: true, trim: true, maxlength: 10000 },
    skills: [{ type: String, trim: true }],
    budget: { type: Number, min: 0 },
    budgetType: { type: String, enum: ['fixed', 'hourly'], default: 'fixed' },
    status: { type: String, enum: ['open', 'in_progress', 'completed', 'cancelled'], default: 'open', index: true }
}, { timestamps: true });
module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);
