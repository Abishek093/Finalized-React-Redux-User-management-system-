const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");

const registerAdmin = asyncHandler(async (req, res) => {
  console.log("got it");
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check if user exist
  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  //check for user email
  const admin = await Admin.findOne({ email });
  console.log(admin);

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getUserData = asyncHandler(async (req, res) => {
  const userData = await User.find();
  if (userData) {
    res.status(200).json(userData);
  } else {
    res.status(400).json("no data ");
  }
});

const editUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId;

    const { body } = req;

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      new: true,
    });
    const users = await User.find();
    console.log(users);
    if (!users) {
      res.status(404).json({ message: "User not found" });
      return;
    } else {
      res.status(200).json({ users });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const userBlock = asyncHandler(async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }
    user.isBlocked = !user.isBlocked;
    console.log("////", userId, user);
    await user.save();
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {}
});

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Add all feilds");
    }

    const existingUser = await User.find({ email: email });
    if (existingUser > 0) {
      res.status(200);
      throw new Error("user alredy exist");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("invalid user data");
    }
  } catch (error) {
    console.error(error);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerAdmin,
  adminLogin,
  getUserData,
  editUser,
  userBlock,
  createUser,
};
