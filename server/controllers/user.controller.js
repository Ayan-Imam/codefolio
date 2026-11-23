import User from '../models/user.js';
import Account from '../models/account.js';

// POST /api/users
// Creates a new user (profile, projects, skills and template) from the request body
export const createUser = async (req, res) => {
  // Take only the fields we expect, ignore anything else in the body
  const { username, profile, projects, skills, templateId } = req.body ?? {};

  // create() builds the document, validates it against the schema, then saves it.
  // If templateId is undefined, Mongoose fills in the default ('minimalist').
  const user = await User.create({ accountId: req.accountId, username, profile, projects, skills, templateId });

  const portfolio = user.toObject();
  delete portfolio.accountId;

  return res.status(201).json(portfolio);
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

export const listMyPortfolios = async (req, res) => {
  const portfolios = await User.find({ accountId: req.accountId })
    .select('username profile.fullName updatedAt -_id')
    .sort({ updatedAt: -1, username: 1 });

  res.set('Cache-Control', 'no-store');
  return res.json(portfolios);
};

export const getMyPortfolio = async (req, res) => {
  const portfolio = await User.findOne({
    username: req.params.username.toLowerCase(),
    accountId: req.accountId,
  }).select('-__v');

  if (!portfolio) {
    return res.status(404).json({ message: 'Saved portfolio not found' });
  }

  res.set('Cache-Control', 'no-store');
  return res.json(portfolio);
};

export const updateMyPortfolio = async (req, res) => {
  const portfolio = await User.findOne({
    username: req.params.username.toLowerCase(),
    accountId: req.accountId,
  }).select('-__v');

  if (!portfolio) {
    return res.status(404).json({ message: 'Saved portfolio not found' });
  }

  const { profile, projects, skills, templateId } = req.body ?? {};

  if (
    (profile !== undefined &&
      (!profile || typeof profile !== 'object' || Array.isArray(profile))) ||
    (projects !== undefined && !Array.isArray(projects)) ||
    (skills !== undefined && !Array.isArray(skills)) ||
    (templateId !== undefined && typeof templateId !== 'string')
  ) {
    return res.status(400).json({ message: 'Invalid portfolio data' });
  }

  if (profile !== undefined) portfolio.profile = profile;
  if (projects !== undefined) portfolio.projects = projects;
  if (skills !== undefined) portfolio.skills = skills;
  if (templateId !== undefined) portfolio.templateId = templateId;

  await portfolio.save();

  res.set('Cache-Control', 'no-store');
  return res.json(portfolio);
};