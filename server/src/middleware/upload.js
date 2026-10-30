import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { HttpError } from '../utils/httpError.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const UPLOAD_DIR = path.resolve(__dirname, '../../uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// The extension comes from the validated MIME type, never from the client's filename.
const EXTENSIONS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/webp': '.webp',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${EXTENSIONS[file.mimetype]}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) =>
    EXTENSIONS[file.mimetype]
      ? cb(null, true)
      : cb(new HttpError(400, 'Only JPEG, PNG, GIF or WebP images are allowed')),
});

/** Single-image upload middleware for a multipart field. */
export const uploadImage = (field) => upload.single(field);

/** Public URL path stored in the database for an uploaded file. */
export const publicPath = (file) => (file ? `/uploads/${file.filename}` : '');

/** Best-effort delete of a previously stored upload (ignores non-upload paths). */
export function removeUpload(urlPath) {
  if (!urlPath || !urlPath.startsWith('/uploads/')) return;
  fs.promises.unlink(path.join(UPLOAD_DIR, path.basename(urlPath))).catch(() => {});
}
