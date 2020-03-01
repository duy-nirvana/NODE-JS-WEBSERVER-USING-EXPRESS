require('dotenv').config();
console.log(process.env.SESSION_SECRET);

const express = require('express');
const cookieParser = require('cookie-parser');
const csurf = require('csurf')

const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const port = 3020;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);
app.use(csurf({ cookie: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Hime-San'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.listen(port, () => console.log(`Server listening on port ${port}`));