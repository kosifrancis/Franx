const Application = require('../models/Application');
const Job = require('../models/Job');
const applyToJob = async (req, res) => {
    const job = await Job.findOne({ _id: req.body.job, status: 'open' });
    if (!job) return res.status(404).json({ message: 'Open job not found' });
    const application = await Application.create({ job: job._id, freelancer: req.user._id, proposal: req.body.proposal, proposedRate: req.body.proposedRate });
    return res.status(201).json(application);
};
const listMyApplications = async (req, res) => res.json(await Application.find({ freelancer: req.user._id }).populate('job').sort({ createdAt: -1 }));
const listJobApplications = async (req, res) => {
    const job = await Job.findOne({ _id: req.params.jobId, employer: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    return res.json(await Application.find({ job: job._id }).populate('freelancer', 'fullName professionalTitle skills hourlyRate'));
};
const updateApplicationStatus = async (req, res) => {
    if (!['accepted', 'rejected'].includes(req.body.status)) return res.status(400).json({ message: 'Status must be accepted or rejected' });
    const application = await Application.findById(req.params.id).populate('job');
    if (!application || String(application.job.employer) !== String(req.user._id)) return res.status(404).json({ message: 'Application not found' });
    application.status = req.body.status;
    await application.save();
    return res.json(application);
};
module.exports = { applyToJob, listMyApplications, listJobApplications, updateApplicationStatus };
