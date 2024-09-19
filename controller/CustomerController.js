const CustomerSchema = require('../model/CustomerSchema');

const create = (req,resp) => {
    try {
        let customerSchema = new CustomerSchema({
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        });

        customerSchema.save()
            .then(result => resp.status(201).json({'message': 'customer saved'}))
            .catch(error => resp.status(500).json({'message': 'something went wrong', error: error}))

    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }
}
const findOneById = (req,resp) => {

}
const deleteOneById = (req,resp) => {

}
const updateById = (req,resp) => {

}
const search = (req,resp) => {

}
module.exports = {create,findOneById,deleteOneById,updateById,search}