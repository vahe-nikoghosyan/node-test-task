const { Product } = require('../models/Product.model');
const {validateProduct} = require("../shared/userValidators");
const {User} = require("../models/User.model");
const bcrypt = require("bcrypt");

const getAllProducts = async (req, res) => {
    console.log("==> get: request");
    try {
        const products = await Product.query();
        console.log("<== get: success");
        return res.status(200).json({
            products
        })
    } catch (err) {
        console.log("<== get: failed");
        return res.status(400).json({
            err
        });
    };
}

const setProduct = async (req, res) => {
    console.log('vadna')
    const data = req.body
    const { value, error } = validateProduct(data);

    if (error) {
        console.log("<== post: error");
        return res.status(401).json({
            status: 'failed',
            message: error.details[0].message
        })
    }
    console.log(data, 'data')
    try {
        const product = await Product.query().insert(data)

        console.log("<== post: success");
        return res.json({
            data: product
        });
    } catch (err) {
        console.log(err)
        console.log("<== post: error");
        return res.status(401).json({
            status: 'failed',
            message: 'error'
        })
    }
}

module.exports = {
    getAllProducts,
    setProduct
}
