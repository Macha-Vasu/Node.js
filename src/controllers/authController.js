const User = require("../models/User");

const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password, role, specialization } = req.body;
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({
      message: "Email already exists",
    });
  const user = new User({ name, email, password, role, specialization });
  console.log("User is ===>", user);
  await User.create(user);
  const token = generateToken(user);
  res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ message: "Invaild credentials" });
  const token = generateToken(user);
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};

exports.me = async (req, res) => {
  req.json(req.user);
};
