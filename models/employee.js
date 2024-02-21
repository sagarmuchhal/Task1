const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    emp_name: {
        type: String,
    },
    emp_salary: {
        type: Number,
    },
    department: {
        type: String,
        ref: 'Department',
    }
});

module.exports = mongoose.model('Employee', employeeSchema);