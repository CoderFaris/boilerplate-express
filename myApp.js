const bodyParser = require("body-parser");
let express = require("express");
let app = express();
require("dotenv").config();


console.log("Hello World");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

  
app.use(function logReqs(req, res, next) {

  console.log(req.method + " " + req.path + " - " + req.ip)
  next();
  
})

app.get('/now', function(req, res, next) {

  req.time = new Date().toString();
  next();
  
}, function(req, res) {

  res.json({time: req.time});
  
})

app.get('/:word/echo', function(req, res) {

  res.json({echo: req.params.word});
  
});

app.post('/name', function(req, res) {

  res.json({name: req.body.first + " " + req.body.last})

})

app.get('/name', function(req, res) {

  res.json({name: req.query.first + " " + req.query.last})
  
})



app.get("/json", (req, res) => {
  msg = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  
  res.json({
    message: msg,
  });

  
});



module.exports = app;
