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
}