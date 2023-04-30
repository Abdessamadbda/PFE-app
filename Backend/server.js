const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app=express();
app.use(cors({
  origin:["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure:false,
    maxAge: 1000 * 60 * 60 *24
  }
}))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"badaouii917",
    database:"inscription"
});

app.get('/', (req, res) => {
  if(req.session.nom && req.session.email){
    return res.json({valid: true, nom: req.session.nom, email: req.session.email, filiere: req.session.filiere, niveau: req.session.niveau})
  } else{
    return res.json({valid: false})
  }
})

db.connect((err) => {
  if (err) {
    console.log("Unable to connect to the database:", err);
  } else {
    console.log("Connected to the database successfully!");
  }
});

app.post("/Student/SignUp", (req, res) => {
    const q = "INSERT INTO `inscription`.`data`(`Nom`,`filiere`,`niveau`,`email`, `password`) VALUES (?, ?, ?, ?, ?)";
  
    const values = [
      req.body.nom,
      req.body.filiere,
      req.body.niveau,
      req.body.email,
      req.body.password
    ];
  
    db.query(q, values, (err, result) => {
      if (err) {
        console.log("Error while executing query:", err);
        res.status(500).send("An error occurred while processing your request.");
      } else {
        console.log("Data inserted successfully!");
        res.status(200).send("Data inserted successfully!");
      }
    });
});


app.post('/Student/Login', (req, res) => {
  const sql = "SELECT * FROM `inscription`.`data` WHERE `email`=? AND `password`=? ";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if(err) return res.json({Message:"Error inside server"});
    if(result.length > 0) {
      req.session.nom = result[0].nom
      req.session.email = result[0].email
      req.session.filiere = result[0].filiere
      req.session.niveau = result[0].niveau
      return res.json({Login: true})
    } else{
        return res.json({Login: false})
    }
  })
})





const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
