const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String, required: true, trim: true, maxlength: 30 },
    role: { type: String, enum: ['employer', 'freelancer'], required: true },
    companyName: { type: String, trim: true },
    companyDescription: { type: String, trim: true },
    companyLocation: { type: String, trim: true },
    professionalTitle: { type: String, trim: true },
    specialties: [{ type: String, trim: true }],
    skills: [{ type: String, trim: true }],
    experienceLevel: { type: String, enum: ['entry', 'intermediate', 'expert'] },
    portfolioUrl: { type: String, trim: true },
    hourlyRate: { type: Number, min: 0 },
    bio: { type: String, trim: true, maxlength: 5000 }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
