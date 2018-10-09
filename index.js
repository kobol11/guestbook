let express = require("express");
let logger = require("morgan");
let http = require("http");
let path = require("path");
let bodyParser = require("body-parser");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

let enteries = [];
app.locals.enteries = enteries;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', (req, res, next)=>{
    res.render("index");
});
app.get('/new-entry', (req, res) => res.render("new-entry"));
app.post("/new-entry", (req, res)=>{
    if(!req.body.title || !req.body.content){
        res.status(400).send("Enteries must have a title and a body");
        return;
    }
    enteries.push({
        title: req.body.title,
        content: req.body.content,
        publication: new Date()
    });
    res.redirect("/");
});
app.use((req, res)=>res.status(404).render("404"));

app.listen(8888, ()=> console.log("Guestbook app started on port 8888."));