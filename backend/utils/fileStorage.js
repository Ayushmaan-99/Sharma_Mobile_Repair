const fs = require('fs');
const path = require('path');

const uploadsRoot = path.join(__dirname, '..', 'uploads');

function ensureUploadSubdir(subdir) {
    const targetDir = path.join(uploadsRoot, subdir);
    fs.mkdirSync(targetDir, { recursive: true });
    return targetDir;
}

function buildStoredUploadPath(subdir, filename) {
    return path.posix.join('uploads', subdir, filename);
}

function normalizeStoredPath(storedPath) {
    return String(storedPath || '').replace(/\\/g, '/').replace(/^\/+/, '');
}

function toPublicUrl(req, storedPath) {
    const normalizedPath = normalizeStoredPath(storedPath);
    return `${req.protocol}://${req.get('host')}/${normalizedPath}`;
}

function toAbsoluteUploadPath(storedPath) {
    if (!storedPath) return null;

    if (path.isAbsolute(storedPath)) {
        return storedPath;
    }

    const normalizedPath = normalizeStoredPath(storedPath);
    if (!normalizedPath.startsWith('uploads/')) {
        return null;
    }

    return path.join(__dirname, '..', normalizedPath);
}

function deleteUpload(storedPath) {
    const absolutePath = toAbsoluteUploadPath(storedPath);
    if (!absolutePath || !fs.existsSync(absolutePath)) return;
    fs.unlinkSync(absolutePath);
}

module.exports = {
    uploadsRoot,
    ensureUploadSubdir,
    buildStoredUploadPath,
    normalizeStoredPath,
    toPublicUrl,
    deleteUpload
};
