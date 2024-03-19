const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

require("./config/mongoose");

const User = require('./models/user');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/users - Create a new user
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    // Create an access token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: '15m' } // Expires in 15 minutes
    );

    // Create a refresh token
    const refreshToken = jwt.sign(
      { userId: newUser._id },
      JWT_SECRET,
      { expiresIn: '7d' } // Expires in 7 days
    );

    // Save the refresh token with the user record in the database
    newUser.refreshTokens = newUser.refreshTokens || [];
    newUser.refreshTokens.push({ token: refreshToken });
    await newUser.save();

    // Return the tokens to the user
    res.status(201).json({
      message: "User created successfully",
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Access token
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' }); // Expires in 15 minutes
    // Refresh token
    const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' }); // Expires in 7 days

    // Save refreshToken with user
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/logout', async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const user = await User.findById(payload.userId);
    // Remove the refresh token from the user
    user.refreshTokens = user.refreshTokens.filter(token => token.token !== refreshToken);
    await user.save();
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/api/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is required" });
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Find the index of the token that matches the incoming refreshToken
    const tokenIndex = user.refreshTokens.findIndex(token => {
      return token.token === refreshToken
    });

    if (tokenIndex === -1) { // Token not found
      return res.status(403).json({ message: "Refresh Token is not valid" });
    }

    // Issue a new access token
    const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });

    // Issue a new refresh token
    const newRefreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' }); // Expires in 7 days

    // Replace the old refresh token with the new one at the same index
    user.refreshTokens[tokenIndex] = { token: newRefreshToken };

    await user.save(); // Save the updated user document

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: "Refresh Token has expired" });
    } else {
      console.error('Token Refresh Error:', error);
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }
  }
});

// GET /api/userInfo - Get user info based on the provided JWT token
app.get('/api/userInfo', authenticateToken, async (req, res) => {
  try {
    // The user ID is attached to the request in the authenticateToken middleware
    const user = await User.findById(req.user.userId).select('-password -refreshTokens'); // Exclude sensitive info
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    console.log(user)
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching user info' });
  }
});

// PUT /api/userInfo - Update user info based on the provided JWT token
app.put('/api/userInfo', authenticateToken, async (req, res) => {
  const updates = req.body;
  const userId = req.user.userId;

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating user information" });
  }
});

app.listen(8080, () => {
  console.log("The server is active on port 8080");
});
