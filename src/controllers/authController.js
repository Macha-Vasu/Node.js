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
