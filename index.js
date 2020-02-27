const express = require('express');

const userRoute = require('./routes/user.route');
const port = 3020;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        name: 'Hime-San'
    });
});

app.use('/users', userRoute);


app.listen(port, () => console.log(`Server listening on port ${port}`));