const express = require('express');
const app = express();
const path = require('path');
const port = 8900;


// mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/danceweeb', { useNewUrlParser: true, useUnifiedTopology: true });

// to connect to mongoose
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
        console.log('connected to mongoose');
});
// defining scheme

var contactSchema = new mongoose.Schema({
        name: String,
        age: Number,
        contact: Number,
        address: String,
        email: String
})
// schema gets compiled into a model
const Contact = mongoose.model("Studs", contactSchema); //kitten is the collection where info will get stored

//----------------------------------------------------------------------------
app.use('/static', express.static('static'));  //serving ststic files
app.use(express.urlencoded());

app.set('view engine', 'pug')  //template engine as pug
app.set('views', path.join(__dirname, 'views'));  //setting view directory

app.get("/", (req, res) => {
        res.status(200).render('home.pug');
})

app.get("/register", (req, res) => {
        res.status(200).render('register.pug');
})

app.get("/about", (req, res) => {
        res.status(200).render("about.pug");
})
app.get("/gallery", (req, res) => {
        res.status(200).render("gallery.pug");
})

app.post("/register", (req, res) => {
        var myData = new Contact(req.body);
        myData.save().then(() => {
                res.send("data saved to database");
        }).catch(() => {
                res.status(400).send("item not saved");
        })
});


// ENDPOINTS---------------------------------------------------------------------------------------------------
app.listen(port, () => {
        console.log(`the application started successfully..at port ${port} `);
});