const Students = require('../model/student');
const { StatusCodes } = require('http-status-codes');
const Cryptr = require('cryptr');
const { BadRequest, AlreadyExsit, UnAuthenticated } = require('../errors');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const renderDashboard = async (req, res) => {
    const data = await Students.find({});
    // return res.status(StatusCodes.OK).json({ data: data, name: req.user.name, email: req.user.email });
    res.render('dashboard', { student: { data: data, name: req.user.name, email: req.user.email } });
}

const creatStudent = async (req, res) => {
    const { email, password, name, rollno } = req.body;
    if (!email || !password || !name || !rollno) {
        throw new BadRequest("Please enter valid credentials");
    }
    const userAlreadyExist = await Students.find({ email: email });
    if (!(_.isEmpty(userAlreadyExist))) {
        throw new AlreadyExsit("User is already registered");
    }
    // const token = jwt.sign({ name: name, email: email }, process.env.JWT_SECRET, { expiresIn: "30d" });
    const encPassword = cryptr.encrypt(req.body.password);
    req.body.password = encPassword;

    //Check if student already exist or not
    const data = await Students.create(req.body);
    // return res.status(StatusCodes.CREATED).json({ data: data, token: token });
    if (data)
        res.redirect("dashboard");
    else
        res.render('dashboard', { err: "Unable to insert record" })
}

const loginUser = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Invalid Login Credetials")
    }
    const userAlreadyExist = await Students.find({ email: email });
    if (_.isEmpty(userAlreadyExist)) {
        throw new UnAuthenticated("Unregistered user trying to login");
    }
    const decExistPass = cryptr.decrypt(userAlreadyExist[0].password)
    if (userAlreadyExist[0].email !== email || decExistPass !== password) {
        throw new BadRequest("Invalid email and password");
    }
    const token = jwt.sign({ id: new Date().getTime().toString(), email: email }, process.env.JWT_SECRET, { expiresIn: '30d' })
    // res.status(StatusCodes.OK).json({ data: `User successfully logged in`, token: token })
    req.session.sToken = token;
    res.redirect("dashboard");
}

const updateStudent = async (req, res) => {
    const { email, password, name, rollno } = req.body;
    if (!email || !password || !name || !rollno) {
        throw new BadRequest("Please enter valid credentials");
    }
    const encPassword = cryptr.encrypt(req.body.password);
    req.body.password = encPassword;
    console.log(req.body);
    const data = await Students.findOneAndUpdate({ rollno: req.body.rollno }, req.body, { runValidators: true });
    console.log(data);
    res.redirect("dashboard");
}

const renderSingleStudent = async (req, res) => {
    const { id } = req.params;
    const data = await Students.findOne({ rollno: id });
    if (!data) {
        res.send("Unable to find such book");
    }
    res.render(`update`, { data: data });
}
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    await Students.findOneAndDelete({ rollno: id });
    res.redirect("/dashboard");
}
// rendering pages only
const renderLoginPage = (req, res) => {
    res.render('index');
}
const renderInsert = (req, res) => {
    res.render('insert');
}
module.exports = { renderInsert, renderDashboard, creatStudent, loginUser, renderLoginPage, renderSingleStudent, updateStudent, deleteStudent }