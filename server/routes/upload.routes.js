import { Router } from 'express';
import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import Account from '../models/account.js';
import { uploadImage } from '../config/cloudinary.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();
const maxImageBytes = 5 * 1024 * 1024;
const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const receiveImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxImageBytes,
    files: 1,
    fields: 0,
  },
}).single('image');

async function requireActiveAccount(req, res, next) {
  const account = await Account.exists({ _id: req.accountId });

  if (!account) {
    return res.status(401).json({ message: 'Account is no longer available' });
  }

  return next();
}

function parseImage(req, res, next) {
  receiveImage(req, res, (error) => {
    if (error?.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'Image must be 5 MB or smaller' });
    }

    if (error) {
      return res.status(400).json({
        message: 'Send one image using the multipart field "image"',
      });
    }

    return next();
  });
}

router.post('/image', requireAuth, requireActiveAccount, parseImage, async (req, res) => {
  if (!req.file?.size) {
    return res.status(400).json({ message: 'Choose an image to upload' });
  }

  let detectedType;

  try {
    detectedType = await fileTypeFromBuffer(req.file.buffer);
  } catch {
    return res.status(415).json({ message: 'Upload a valid JPEG, PNG, or WebP image' });
  }

  if (!allowedImageTypes.has(detectedType?.mime)) {
    return res.status(415).json({ message: 'Upload a valid JPEG, PNG, or WebP image' });
  }

  try {
    const result = await uploadImage(req.file.buffer);

    return res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Cloudinary upload failed:', error.message);
    return res.status(502).json({ message: 'Image upload failed. Try again.' });
  }
});

export default router;