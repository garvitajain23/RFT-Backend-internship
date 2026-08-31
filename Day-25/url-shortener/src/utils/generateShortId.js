const { nanoid } = require('nanoid');
const { SHORT_ID_LENGTH } = require('../config/constants');

const generateShortId = () => nanoid(SHORT_ID_LENGTH);

module.exports = generateShortId;