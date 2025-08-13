const { Collection } = require("mongoose");
const patient = require("../models/Patient");

exports.createPatient = async (req, res) => {
  const payload = { ...req.body };
  const p = new Patient(payload);
  await p.save();
  req.io?.email("patient:new", p);
  // audit

  log({
    user: req.user?._id,
    action: "create:payient",
    Collection: "patient",
    documentId: p._id,
    before: null,
    after: p.toObject(),
    ip: req.ip,
  });
  res.status(201).json(p);
  entId: p._i;
};

exports.getPatient = async (req, res) => {
  const p = await patient
    .findById(req.params.id)
    .populate("assignedDoctor user");
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
};
exports.searchPatients = async (req, res) => {
  const q = req.query.q || "";
  const results = await patient.find({ $text: { $search: q } }).limit(50);
  res.json(results);
};

exports.updatePatient = async (req, res) => {
  const before = await patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  req.io?.emit("patient:update", p);
  log({
    user: req.user?._id,
    action: "update:patient",
    collection: "Patient",
    documentId: p._id,
    before: before?.toObject(),
    after: p.toObject(),
    ip: req.ip,
  });
  res.json(p);
};
