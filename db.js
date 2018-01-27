var db = {};

function get_entries() {
    entries = [];
    Object.keys(db).forEach(function(key) {
        entries.push(db[key]);
    });
    return entries;
}

function add_entry(entry) {
    db[entry.mail] = entry;
}

function exists_entry(key) {
    if (db[key]) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    get_entries: get_entries,
    add_entry: add_entry,
    exists_entry: exists_entry
};
