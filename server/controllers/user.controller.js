import User from '../models/user.js';

// POST /api/users
export const createUser = async (req, res) => {
  const { username, profile, projects, skills, certificates, templateId } = req.body ?? {};

  const user = await User.create({
    accountId: req.accountId,
    username,
    profile,
    projects,
    skills,
    certificates,
    templateId,
  });

  const portfolio = user.toObject();
  delete portfolio.accountId;

  return res.status(201).json(portfolio);
};

// GET /api/users/:username
export const getUserByUsername = async (req, res) => {
  const username = req.params.username.toLowerCase();
  const user = await User.findOne({ username }).select('-__v -profile.email');

  if (!user) {
    return res
      .status(404)
      .json({ message: `No portfolio found for "${req.params.username}"` });
  }

  return res.json(user);
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

  const { profile, projects, skills, certificates, templateId } = req.body ?? {};

  if (
    (profile !== undefined &&
      (!profile || typeof profile !== 'object' || Array.isArray(profile))) ||
    (projects !== undefined && !Array.isArray(projects)) ||
    (skills !== undefined && !Array.isArray(skills)) ||
    (certificates !== undefined && !Array.isArray(certificates)) ||
    (templateId !== undefined && typeof templateId !== 'string')
  ) {
    return res.status(400).json({ message: 'Invalid portfolio data' });
  }

  if (profile !== undefined) portfolio.profile = profile;
  if (projects !== undefined) portfolio.projects = projects;
  if (skills !== undefined) portfolio.skills = skills;
  if (certificates !== undefined) portfolio.certificates = certificates;
  if (templateId !== undefined) portfolio.templateId = templateId;

  await portfolio.save();

  res.set('Cache-Control', 'no-store');
  return res.json(portfolio);
};