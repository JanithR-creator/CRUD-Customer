const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const wt = require('jsonwebtoken');
const secret = process.env.SECRET;

const signUp = async (req, res) => {
    try {

        const userExists = await UserSchema.findOne({email: req.body.email});

        if (userExists) {
            return res.status(400).json({'message': 'user already exists'});
        }

        const hash = await bcrypt.hash(req.body.password, 10);

        let userSchema = new UserSchema({
            email: req.body.email,
            password: hash,
            fullName: req.body.fullName
        });
        userSchema.save()
            .then(result => res.status(201)
                .json({'message': 'user saved'}))
            .catch(error => res.status(500).json({'message': 'something went wrong', error: error}))
    } catch (e) {
        res.status(500).json({'message': 'something went wrong', error: e})
    }
}

const login = async (req, res) => {
    try {
        const userExists = await UserSchema.findOne({email: req.body.email});
        if (!userExists) {
            return res.status(404).json({'message': 'user not found'});
        }

        const isConfirmed = await bcrypt.compare(req.body.password, userExists.password);

        if (!isConfirmed) {
            return res.status(404).json({'message': 'wrong password...'})
        }

        const token = wt.sign({userId: userExists._id, email: userExists.email, fullName: userExists.fullName},
            secret,
            {expiresIn: '5h'});
        res.status(200).json({'token': token, 'message': 'login success'});
    } catch (e) {
        res.status(500).json({'message': 'something went wrong', error: e});
    }
}

module.exports = {signUp, login}