const Contract = require('../models/Contract');
const Application = require('../models/Application');
const createContract = async (req, res) => {
    const application = await Application.findById(req.body.application).populate('job');
    if (!application || String(application.job.employer) !== String(req.user._id) || application.status !== 'accepted') return res.status(404).json({ message: 'Accepted application not found' });
    const contract = await Contract.create({ job: application.job._id, employer: req.user._id, freelancer: application.freelancer, application: application._id, amount: req.body.amount, terms: req.body.terms });
    return res.status(201).json(contract);
};
const listContracts = async (req, res) => res.json(await Contract.find({ $or: [{ employer: req.user._id }, { freelancer: req.user._id }] }).populate('job', 'title').sort({ createdAt: -1 }));
const updateContractStatus = async (req, res) => {
    if (!['completed', 'cancelled'].includes(req.body.status)) return res.status(400).json({ message: 'Status must be completed or cancelled' });
    const contract = await Contract.findOne({ _id: req.params.id, $or: [{ employer: req.user._id }, { freelancer: req.user._id }] });
    if (!contract) return res.status(404).json({ message: 'Contract not found' });
    contract.status = req.body.status;
    await contract.save();
    return res.json(contract);
};
module.exports = { createContract, listContracts, updateContractStatus };
