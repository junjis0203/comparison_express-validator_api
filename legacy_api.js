const express = require('express');

const { get_entries, add_entry, exists_entry } = require('./db');

var router = express.Router();

router.get('/', function(req, res) {
    res.render('index', {entries: get_entries()});
});

router.post('/', function(req, res) {
    req.check('name', 'Name must be specified').notEmpty();
    req.check('mail', "E-mail don't look like E-mail").isEmail();

    // legacy API can't chain sanitization
    req.sanitize('mail').trim();
    req.sanitize('mail').normalizeEmail();

    req.getValidationResult().then(function(result) {
        errors = undefined;
        if (!result.isEmpty()) {
            errors = result.array();
        } else {
            entry = {name: req.body.name, mail: req.body.mail};
            // this check is too specific for installing custom validator
            if (exists_entry(entry.mail)) {
                errors = [{ param: 'mail', msg: 'this E-mail address is already in use' }];
            } else {
                add_entry(entry);
            }
        }

        if (errors) {
            res.render('index', {entries: get_entries(), errors: errors});
        } else {
            res.redirect(req.originalUrl);
        }
    });
});

module.exports = router;
