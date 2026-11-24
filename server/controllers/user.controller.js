import User from '../models/user.js';
import Account from '../models/account.js';

// POST /api/users
export const createUser = async (req, res) => {
  const {
    username,
    profile,
    projects,
    skills,
    certificates,
    timeline,
    templateId,
  } = req.body ?? {};

  if (timeline !== undefined && !Array.isArray(timeline)) {
    return res.status(400).json({ message: 'Timeline must be an array' });
  }

  const user = await User.create({
    accountId: req.accountId,
    username,
    profile,
    projects,
    skills,
    certificates,
    timeline,
    templateId,
  });

  // console.log('Pro badge check', {
  //   portfolioDb: User.db.name,
  //   accountDb: Account.db.name,
  //   accountCollection: Account.collection.name,
  //   ownerId: user.accountId?.toString(),
  //   accountFound: Boolean(account),
  //   isPro: account?.isPro,
  // });

  const portfolio = user.toObject();
  delete portfolio.accountId;

  return res.status(201).json(portfolio);
};

// GET /api/users/:username
// GET /api/users/:username
export const getUserByUsername = async (req, res) => {
  // console.log('Entered getUserByUsername', req.params.username);
  const username = req.params.username.toLowerCase();
  const user = await User.findOne({ username })
    .select('-__v -profile.email')
    .select('+accountId');

  if (!user) {
    return res
      .status(404)
      .json({ message: `No portfolio found for "${req.params.username}"` });
  }

  const owner = await User.collection.findOne(
  { _id: user._id },
  { projection: { accountId: 1 } }
);

const account = owner?.accountId
  ? await Account.findById(owner.accountId).select('isPro').lean()
  : null;
  
  // console.log('Pro lookup:', user.accountId?.toString(), account);
  const portfolio = user.toJSON();
  delete portfolio.accountId;

  return res.json({
    ...portfolio,
    isPro: account?.isPro === true,
  });
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

  const { profile, projects, skills, certificates, timeline, templateId } =
    req.body ?? {};

  if (timeline !== undefined && !Array.isArray(timeline)) {
    return res.status(400).json({ message: 'Timeline must be an array' });
  }

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
  if (timeline !== undefined) portfolio.timeline = timeline;
  if (templateId !== undefined) portfolio.templateId = templateId;

  await portfolio.save();

  res.set('Cache-Control', 'no-store');
  return res.json(portfolio);
};