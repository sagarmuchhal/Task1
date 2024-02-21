const express = require('express');
const router = express.Router();
const Department = require('../models/department');
const Employee = require('../models/employee');
const User = require('../models/register');

router.post('/add_department', async(req, res) => {
    try {
        const { dept_name } = req.body;
        const department = new Department({
            dept_name,
        });
        const saveddepartment = await department.save();
        res.status(200).json(saveddepartment);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error..' });
    }
});

router.get('/get_departments', async(req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ message: 'All Departments :', departments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error...' });
    }
});

router.post('/add_employee', async(req, res) => {
    try {
        const { emp_name, emp_salary, department } = req.body;
        const employee = new Employee({
            emp_name,
            emp_salary,
            department,
        });
        const savedemployee = await employee.save();
        const departmentobj = await Department.findOne({
            dept_name: department,
        });
        if (!departmentobj) {
            return res.status(400).json({ message: 'Department Not Found' });
        }
        const user = new User({
            emp_id: savedemployee._id,
            dept_id: departmentobj._id,
        });
        await user.save();
        res.status(200).json({ message: 'Employee :', savedemployee });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server Error..' });
    }
});

router.get('/get_employees', async(req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ message: 'All Employees :', employees });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error...' });
    }
});

// Update employee details
router.put('/update_employee/:id', async(req, res) => {
    try {
        const employeeId = req.params.id;
        const { emp_name, emp_salary, department } = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, { emp_name, emp_salary, department }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error...' });
    }
});

// Delete employee and user
router.delete('/delete_employee/:id', async(req, res) => {
    try {
        const employeeId = req.params.id;
        // Delete employee
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        // Delete user
        await User.findOneAndDelete({ emp_id: employeeId });
        res.status(200).json({ message: 'Employee and associated user deleted successfully', deletedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error...' });
    }
});


module.exports = router;