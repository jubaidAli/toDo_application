import rateLimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
    try {
        if (!rateLimit) {
            console.error('Ratelimiter not configured');
            return next();
        }

        // Use request IP as the identifier for rate limiting
        const { success, limit, remaining, reset } = await rateLimit.limit(req.ip);

        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', remaining);
        res.setHeader('X-RateLimit-Reset', reset);

        if (!success) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }

        return next();
    }

    catch (error) {
        console.error("Ratelimiter error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default rateLimiter;