const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');

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

module.exports = {signUp}