require('dotenv').config();
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
// const { Model } = require('objection');
// const knex = require('./db');

/*
 * App Variables
 */
const { PORT = '8080' } = process.env;
const auth = require('./routes/auth.route');
const users = require('./routes/user.route');
const products = require('./routes/product.route');
const app = express();

/*
 * App Configuration
 */
// Model.knex(knex);
// knex
//     .raw("select 1+1 as result")
//     .then(() => {
//         console.log("Connection to DB successfully completed");
//     })
//     .catch(err => console.log("Connection DB error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use('/auth', auth);
app.use('/users', users);
app.use('/products', products);
app.get('/', (req, res) => {
    res.json({ok:'ok'})
})
app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
