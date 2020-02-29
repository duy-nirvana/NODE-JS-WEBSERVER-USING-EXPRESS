const db = require('../db');

module.exports.index = (req, res) => {
    let page = parseInt(req.query.page) || 1; //n
    let perPage = 8; //x

    let start = (page - 1) * perPage;
    let end = page * perPage; //== (page - 1) * perPage + perPage;

    let drop = (page - 1) * perPage;

    res.render('products/index', {
        products: db.get('products').drop(drop).take(perPage).value()
    });
};