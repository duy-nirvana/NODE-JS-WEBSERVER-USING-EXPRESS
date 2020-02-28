require('dotenv').config();
console.log(process.env.SESSION_SECRET);

const express = require('express');
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

const authMiddleware = require('./middlewares/auth.middleware');

const port = 3020;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Hime-San'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Server listening on port ${port}`));