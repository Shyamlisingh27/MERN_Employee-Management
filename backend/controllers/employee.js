const Employee = require('../models/employee');
const mongoose=require("mongoose")

//create emp
exports.createEmployee = async (req, res) => {
    try {
      const { name, email, mobile, designation, gender, course } = req.body;
      const image = req.file ? req.file.filename : null;
      const employee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course: course.split(','), // Checkbox array
        image,
      });
      await employee.save();
      res.status(201).json({ message: 'Employee added successfully', employee });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


//get emplist
exports.getEmployees = async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

//get emp by id
exports.getEmployeeById=async (req, res) => {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid employee ID format' });
    }

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Server error' });
}
}


//update emp
exports.updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = { ...req.body };
      if (req.file) updatedData.image = req.file.path;
  
      const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
      res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


//delete emp
exports.deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      await Employee.findByIdAndDelete(id);
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};


//duplicate email
exports.duplicateEmail=async (req, res) => {
  const { email } = req.body;
  const existingEmployee = await Employee.findOne({ email });
  res.json({ isDuplicate: !!existingEmployee });
}


