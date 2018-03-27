const pool = require('../db/pool');

module.exports = app => {
    app.get('/api/games', (req, res) => {
        let search;
        if (req.query.search) search = pool.escape(`%${req.query.search}%`)
        let query = 'SELECT * FROM games'

        if (req.query.search) query += ` WHERE name LIKE ${search}`;
        console.log(query);

        pool.query(query, (err, results, fields) => {
            if (err) throw err;
            console.log(results);
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
}