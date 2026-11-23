import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Account from '../models/account.js';

export const register = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
  ) {
    return res.status(400).json({ message: 'Enter a valid email address' });
  }

  if ([...password].length < 15 || Buffer.byteLength(password, 'utf8') > 72) {
    return res.status(400).json({
      message: 'Use at least 15 characters and no more than 72 UTF-8 bytes',
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const account = await Account.create({ email: normalizedEmail, passwordHash });

  return res.status(201).json({
    id: account.id,
    email: account.email,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body ?? {};
  const invalidCredentials = { message: 'Invalid email or password' };

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    email.length > 254 ||
    !password ||
    Buffer.byteLength(password, 'utf8') > 72
  ) {
    return res.status(401).json(invalidCredentials);
  }

  const account = await Account.findOne({
    email: email.trim().toLowerCase(),
  }).select('+passwordHash');

  if (!account || !(await bcrypt.compare(password, account.passwordHash))) {
    return res.status(401).json(invalidCredentials);
  }

  const token = jwt.sign({}, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    subject: account.id,
    expiresIn: '1h',
  });

  res.set('Cache-Control', 'no-store');

  return res.json({
    token,
    account: { id: account.id, email: account.email },
  });
};

export const getCurrentAccount = async (req, res) => {
  const account = await Account.findById(req.accountId).select('email');

  if (!account) {
    return res.status(401).json({ message: 'Account is no longer available' });
  }

  res.set('Cache-Control', 'no-store');

  return res.json({
    id: account.id,
    email: account.email,
  });
};