const Job = require('../models/Job');
const listJobs = async (req, res) => {
    const filter = { status: 'open' };
    if (req.query.skill) filter.skills = { $in: [req.query.skill] };
    const jobs = await Job.find(filter).populate('employer', 'fullName companyName companyLocation').sort({ createdAt: -1 }).limit(100);
    res.json(jobs);
};
const getJob = async (req, res) => {
    const job = await Job.findById(req.params.id).populate('employer', 'fullName companyName companyLocation');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    return res.json(job);
};
const createJob = async (req, res) => res.status(201).json(await Job.create({ ...req.body, employer: req.user._id }));
const updateJob = async (req, res) => {
    const allowed = ['title', 'description', 'skills', 'budget', 'budgetType', 'status'];
    const changes = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const job = await Job.findOneAndUpdate({ _id: req.params.id, employer: req.user._id }, changes, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    return res.json(job);
};
const deleteJob = async (req, res) => {
    const job = await Job.findOneAndDelete({ _id: req.params.id, employer: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    return res.status(204).end();
};
module.exports = { listJobs, getJob, createJob, updateJob, deleteJob };
