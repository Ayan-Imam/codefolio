import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authorization = req.get('Authorization') || '';
  const match = /^Bearer ([^\s]+)$/i.exec(authorization);

  if (!match) {
    return res.status(401).json({
      message: 'A Bearer token is required',
    });
  }

  let payload;

  try {
    payload = jwt.verify(match[1], process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired token',
    });
  }

  if (
    typeof payload.sub !== 'string' ||
    !/^[a-f0-9]{24}$/i.test(payload.sub)
  ) {
    return res.status(401).json({ message: 'Invalid token subject' });
  }

  req.accountId = payload.sub;
  return next();
};