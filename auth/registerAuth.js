const User = require('../model/User');
module.exports = {
    auth: (req, res, next) => {
        let errors = []
        const { name, email, password } = req.body;

        //Check Required Field
        if (!name || !email || !password) {
            errors.push({ msg: 'Please fill all Field' });
        }

        //Check Required Field
        if (!name || !email || !password) {
            errors.push({ msg: 'Please fill all Field' });
        }
    }
}