import User from '../models/user.js';

// POST /api/users
// Creates a new user (profile, projects and skills) from the request body
export const createUser = async (req, res) => {
  // Take only the fields we expect, ignore anything else in the body
  const { username, profile, projects, skills } = req.body;

  // create() builds the document, validates it against the schema, then saves it
  const user = await User.create({ username, profile, projects, skills });

  res.status(201).json(user);
};