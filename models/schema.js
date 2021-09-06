const Knex = require('knex');
const connection =  require('../knexfile');
const { Model } = require("objection");

const environment = process.env.NODE_ENV || "development";

const db = Knex(connection[environment]);
Model.knex(db);

module.exports = Model;
