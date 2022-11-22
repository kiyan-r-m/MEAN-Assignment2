const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        trim: true,
        require: [`Roll number is required`, true]
    },
    name: {
        type: String,
        trim: true,
        require: [`Name is required`, true]
    },
    email: {
        type: String,
        trim: true,
        require: [`Email is required`, true]
    },
    password: {
        type: String,
        require: [`Must enter the password`, true]
    }
})
module.exports = mongoose.model("student", studentSchema);