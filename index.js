require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const keys = require('./config/keys');
require('./services/passport');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

require('./routes/authRoutes')(app);
require('./routes/getRoutes')(app);
require('./routes/postRoutes')(app);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('server is running on port 5000')
});