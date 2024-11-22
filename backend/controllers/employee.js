const Employee = require('../models/employee');

//create emp
exports.createEmployee = async (req, res) => {
    try {
      const { name, email, mobile, designation, gender, course } = req.body;
      const employee = new Employee({
        name,
        email,
        mobile,
        designation,
        gender,
        course: course.split(','), // Checkbox array
        image: req.file ? req.file.path : null,
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