const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(process.env.URL)
        .then(client => {
            console.log('Connected to database');
            _db = client.db(process.env.DB_NAME);
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
};

exports.mongoConnect=mongoConnect 
exports.getDb=getDb;
 