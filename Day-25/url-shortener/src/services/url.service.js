const Url = require('../models/Url.model');
const generateShortId = require('../utils/generateShortId');
const { BASE_URL, DEFAULT_EXPIRY_DAYS } = require('../config/constants');

class UrlService {
  async createShortUrl(originalUrl, customAlias, expiryDays) {
    let shortId;

    if (customAlias) {
      const existing = await Url.findOne({ shortId: customAlias });
      if (existing) {
        throw new Error('Custom alias already taken');
      }
      shortId = customAlias;
    } else {
      shortId = generateShortId();
      // ensure uniqueness (extremely unlikely collision, but be safe)
      while (await Url.findOne({ shortId })) {
        shortId = generateShortId();
      }
    }

    const days = expiryDays || DEFAULT_EXPIRY_DAYS;
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    const url = await Url.create({
      originalUrl,
      shortId,
      customAlias: !!customAlias,
      expiresAt,
    });

    return {
      shortUrl: `${BASE_URL}/${url.shortId}`,
      ...url.toObject(),
    };
  }

  async getOriginalUrl(shortId) {
    const url = await Url.findOne({ shortId });

    if (!url) throw new Error('URL not found');

    if (url.expiresAt < new Date()) {
      await Url.deleteOne({ _id: url._id });
      throw new Error('URL has expired');
    }

    url.clicks += 1;
    await url.save();

    return url.originalUrl;
  }

  async getAnalytics(shortId) {
    const url = await Url.findOne({ shortId });
    if (!url) throw new Error('URL not found');

    return {
      shortId: url.shortId,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      expiresAt: url.expiresAt,
      isExpired: url.expiresAt < new Date(),
    };
  }

  async deleteExpiredUrls() {
    const result = await Url.deleteMany({ expiresAt: { $lt: new Date() } });
    return result.deletedCount;
  }

  async deleteUrl(shortId) {
    const result = await Url.findOneAndDelete({ shortId });
    if (!result) throw new Error('URL not found');
    return result;
  }
}

module.exports = new UrlService();