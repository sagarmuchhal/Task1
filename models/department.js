const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    dept_name: {
        type: String,
    }
});

module.exports = mongoose.model('Department', departmentSchema);