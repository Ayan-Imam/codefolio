// Express recognizes error handlers by their 4 parameters, so `next`
// must stay in the list even though we don't use it.
const errorHandler = (err, req, res, next) => {
  // 1. Schema validation failed (required field missing, too short, bad format...)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: errors.join('. '), errors });
  }

  // 2. Duplicate value in a unique field (MongoDB error code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'value';
    return res.status(409).json({ message: `This ${field} is already taken` });
  }

  // 3. Everything else. Errors from Express itself (such as malformed JSON)
  //    carry their own status; anything unknown is a 500.
  const status = err.status || 500;
  if (status === 500) console.error(err); // log the details on the server only

  res.status(status).json({
    message: status === 500 ? 'Internal server error' : err.message,
  });
};

export default errorHandler;