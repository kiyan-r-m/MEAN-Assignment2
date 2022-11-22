require("dotenv").config({ path: "./q-2/.env" });
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

// settingup port 
const port = process.env.PORT || 5000;

//settingup middlewares
app.use(session({
    secret: process.env.SESSION_KEY,
    saveUninitialized: false,
    resave: false,
    store: new FileStore({ path: "./q-2/session-data" })
}))
app.use(express.static("./q-2/public"));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.post("/dash", (req, res) => {
    console.log(req.body)
    req.session.email = req.body.email;
    req.session.loggedIn = true;
    res.status(200).json({ success: true, data: {} })
})
app.get("/verify", (req, res) => {
    res.status(200).json({ success: true, data: { email: req.session.email } });
})
app.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).json({ success: false, data: { error: err } })
            }
            else {
                res.clearCookie("connect.sid");
                res.status(200).json({ success: true, data: {} });
            }
        })
    }
    else {
        res.status(400).json({ success: false, data: { msg: "you already logged out" } });
    }
})
app.listen(port, console.log(`Server is listening on port ${port}`));