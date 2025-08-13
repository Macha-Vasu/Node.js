const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    age: Number,
    gender: { type: String, enum: ["male", "female", "other"] },
    contact: String,
    address: String,
    medicalHistory: [{ date: Date, note: String }],
    assignedDoctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

patientSchema.index({ name: "text", contact: 1 });

module.exports = mongoose.model("Patient", patientSchema);
