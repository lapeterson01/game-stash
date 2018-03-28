const pool = require('../db/pool');
const multer = require('multer');

module.exports = app => {
    app.post('/api/games', (req, res) => {
        let gameFile = req.files.file;
        const __dirname = './server/client'

        gameFile.mv(`${__dirname}/public`, (err) => {
            if (err) throw err;

            res.json({file: `public/${gameFile.name}`});
        });
        res.send();
    })

    app.post('/api/scores', (req, res) => {
        const currentTime = new Date();

        pool.query('INSERT INTO scores (gID, uID, score, timeOfScore) VALUES (?, ?, ?, ?)', [req.body.game, req.user.uID, req.body.score, currentTime.getTime()], (err, results, fields) => {
            if (err) throw err;

            res.send();
        })
    })
}