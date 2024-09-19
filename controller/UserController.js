const UserSchema = require('../model/UserSchema');

const signUp = (req, res) => {
    try {
        let userSchema = new UserSchema({
            email: req.body.email,
            password: req.body.password,
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