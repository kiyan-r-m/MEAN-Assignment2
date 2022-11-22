const express = require('express');
const { renderDashboard, creatStudent, loginUser, renderLoginPage, renderInsert, renderSingleStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.route('/dashboard').get(auth, renderDashboard);
router.route('/').get(renderLoginPage).post(loginUser);
router.route('/insert').get(renderInsert).post(auth, creatStudent);
router.route('/update/:id').get(auth, renderSingleStudent);
router.route("/edit").post(auth, updateStudent);
router.route("/delete/:id").get(auth, deleteStudent);
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie("connect.sid");
            res.render("index")
        }
        else {
            res.render("dashboard", { err: "Enable to logout" });
        }
    })
})
module.exports = router;
