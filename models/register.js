const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee' // Reference to Employee model
    },
    dept_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department' // Reference to Department model
    },
});

module.exports = mongoose.model('User', userSchema);