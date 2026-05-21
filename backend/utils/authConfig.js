const DEVELOPMENT_JWT_SECRET = 'development_only_change_me';

function getJwtSecret() {
    if (process.env.JWT_SECRET) {
        return process.env.JWT_SECRET;
    }

    if (process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET must be set in production');
    }

    return DEVELOPMENT_JWT_SECRET;
}

module.exports = { getJwtSecret };
