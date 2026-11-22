import User from '../models/user.js';

// POST /api/users
// Creates a new user (profile, projects, skills and template) from the request body
export const createUser = async (req, res) => {
  // Take only the fields we expect, ignore anything else in the body
  const { username, profile, projects, skills, templateId } = req.body;

  // create() builds the document, validates it against the schema, then saves it.
  // If templateId is undefined, Mongoose fills in the default ('minimalist').
  const user = await User.create({ username, profile, projects, skills, templateId });

  res.status(201).json(user);
};

// GET /api/users/:username
// Returns the public data of one portfolio
export const getUserByUsername = async (req, res) => {
  // Usernames are stored in lowercase, so /NEON_USER finds neon_user too
  const username = req.params.username.toLowerCase();

  // Not .lean(): a full document gets schema defaults filled in (e.g. templateId)
  // select(): leave out the internal version field and the private contact email
  const user = await User.findOne({ username }).select('-__v -profile.email');

  if (!user) {
    return res
      .status(404)
      .json({ message: `No portfolio found for "${req.params.username}"` });
  }

  res.json(user);
};