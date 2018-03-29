const pool = require('../db/pool');

module.exports = app => {
    app.get('/api/games', (req, res) => {
        let search;
        if (req.query.search) search = pool.escape(`%${req.query.search}%`)
        let query = 'SELECT * FROM games'

        if (req.query.search) query += ` WHERE name LIKE ${search}`;

        pool.query(query, (err, results, fields) => {
            if (err) throw err;
            res.send(results);
        })
    });

    app.get('/api/games/:gameID', (req, res) => {
        pool.query('SELECT * FROM games WHERE gID = ?', [req.params.gameID], (err, result, fields) => {
            if (err) throw err;
            res.send(result);
        })
    });

    app.get('/api/scores', (req, res) => {
        pool.query('SELECT u.name as player, u.imageURL as profilePic, g.name as game, g.imageURL as gamePic, s.score FROM users as u JOIN scores as s ON u.uID = s.uID JOIN games as g ON s.gID = g.gID WHERE g.gID = ? ORDER BY s.score DESC', [req.query.game], (err, results, fields) => {
            if (err) throw err;
            res.send(results);
        })
    });

    app.get('/api/:userID/info', (req, res) => {
        pool.query('SELECT u.uID, u.name as user, u.imageURL as userImage, u.lastLoginAt, s.sID, s.score, s.timeOfScore, g.gID, g.name as game, g.imageURL as gameImage FROM users as u JOIN scores as s ON u.uID = s.uID JOIN games as g ON s.gID = g.gID WHERE u.uID = ? ORDER BY s.score DESC;', [req.params.userID], (err, results, fields) => {
            if (err) throw err;
            res.send(results);
        })
    })

    app.get('/api/:userID/games/played', (req, res) => {
        pool.query('SELECT g.gID, g.name, s.sID, max(s.timeOfScore) as timeOfScore, u.uID FROM games as g JOIN scores as s ON g.gID = s.gID JOIN users as u ON s.uID = u.uID WHERE u.uID = ? GROUP BY g.gID', [req.params.userID], (err, results, fields) => {
            if (err) throw err;
            res.send(results);
        })
    })
}