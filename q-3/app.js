require('express-async-errors');
require('dotenv').config({ path: './q-4/.env' });
const path = require('path');
const express = require('express');
const connectDB = require('./db/connection');
const FileNotFound = require('./middlewares/not-found');
const studentRouter = require('./routes/studentRouter');
const customErrorhandler = require('./middlewares/error-handler');
const app = express();
const helmet = require('helmet');
const ejs = require('ejs');
const cors = require('cors');
const session = require("express-session");
const FileStore = require("session-file-store")(session);

//Port variable
const port = process.env.PORT || 5000;

app.use(session({
    secret: "session-rsa-key",
    saveUninitialized: false,
    resave: false,
    store: new FileStore({ path: `./q-4/session-data` })
}))

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, 'views'));
// adding bootstrap
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

//middlewares
app.use(helmet());
app.use(cors())
// app.use(express.static("./q-4/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting up common route for th API
// app.use('/api/v1/students', studentRouter);
app.use('/', studentRouter);

//Error handlers
app.use(FileNotFound);
//app.use(customErrorhandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`));
    }
    catch (ex) {
        console.log(ex)
    }
}
start();