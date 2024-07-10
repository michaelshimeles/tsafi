const imap = new Map(require('./map'));
const mimer = require('.');

module.exports = function MimerSafe(input) {
    return mimer(input, imap);
}
