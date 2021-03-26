const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('outm_db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
db.serialize(() => {
    db.each(`SELECT time, result
           FROM shifts`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.time + "\t" + row.result);
    });
});

db.close();
