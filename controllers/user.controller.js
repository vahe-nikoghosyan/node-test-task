const { User } = require('../models/User.model');
const { validate } = require("../shared/userValidators");
const bcrypt = require('bcrypt');

/**
 * Returns all users.
 *
 * @param {request} req The request object.
 * @param {response} res The response object.
 * @return {object} respond user object when a GET request is made to the client.
 */

const getAllUsers = async (req, res) => {
    console.log('==> get: ', new Date().toLocaleTimeString());
    try {
        const users = await User.query();
        console.log('<== get: ', new Date().toLocaleTimeString());
        return res.status(200).json(users);
    } catch (err) {
        console.log('<== get: failed');
        return res.status(400).json({
            err
        })
    }
}

const getUserById = async (req, res) => {
    console.log('==> get:', new Date().toLocaleTimeString());
    const { id } = req.params
    // fetches the related products using the .withGraphFetched method
    try {
        const user = await User.query().findById(id).withGraphFetched('products');
        console.log('<== get:', new Date().toLocaleTimeString());
        return res.status(200).json(user);
    } catch (err) {
        console.log("<== get: failed");
        return res.status(400).json({
            err
        });
    };
}

const insertNewUser = async (req, res) => {
    console.log("==> post: request")
    const data = req.body
    const { value, error } = validate(data);
    const isExist = await User.query().findOne({ email: value.email });
    if (isExist) {
        console.log("<== post: error");
        return res.status(401).json({
            status: 'failed',
            message: "This email address is already being used"
        });
    }
    if (error) {
        console.log("<== post: error");
        return res.status(401).json({
            status: 'failed',
            message: error.details[0].message
        })
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(value.password, salt);

        const userData = { ...value, password };
        const user = await User.query().insertAndFetch(userData).returning('*');

        console.log("<== post: success");
        return res.json({
            data: { ...user, password: null }
        });
    } catch (err) {
        console.log("<== post: error");
        return res.status(401).json({
            status: 'failed',
            message: 'error'
        })
    }

}

const updateUser = async (req, res) => {
    console.log("==> put: request");
    const { id } = req.params
    const data = req.body
    const { value, error } = validate(data);

    const isExist = await User.query().findById(id);

    if (error) {
        console.log("<== put: error");
        return res.status(400).json({
            error: error
        });
    }

    if (isExist) {
        try {
            const user = await User.query().findById(id).patch(value);
            console.log("<== put: success");
            return res.status(200).json({
                data: user
            });
        } catch (err) {
            return res.status(400).json({
                error: err
            });
        }
    }
    return res.status(400).json({
        error: "This email address does not contain in the database"
    });
    console.log("<== put: error");
}

const deleteUser = async (req, res) => {
    console.log("==> delete: request");
    const { id } = req.params

    try {
      const deletedUser = await User.query().deleteById(id);
      console.log("<== delete: success");
      return res.status(200).json({
          deletedUser
      })
    } catch (err) {
        console.log("<== delete: failed");
        return res.status(400).json({
            err
        })
    };
}

module.exports = {
    getAllUsers,
    getUserById,
    insertNewUser,
    updateUser,
    deleteUser
};
