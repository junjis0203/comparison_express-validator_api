const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const { get_entries, add_entry, exists_entry } = require('./db');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {entries: get_entries()});
});

router.post('/', [
    check('name', 'Name must be specified')
        .isLength({ min: 1 }),
    check('mail', "E-mail don't look like E-mail")
        .isEmail()
        .trim()
        .normalizeEmail()
        .custom(function(value) {
            if (exists_entry(value)) {
                throw new Error('this email is already in use');
            }
            return true;
        })
], function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('index', {entries: get_entries(), errors: errors.array()});
    } else {
        entry = matchedData(req);
        add_entry(entry);
        res.redirect(req.originalUrl);
    }
});

module.exports = router;
