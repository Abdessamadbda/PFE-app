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
    database:"PFE-app"
});


app.get('/', (req, res) => {
  if(req.session.nom && req.session.email){
    return res.json({valid: true, nom: req.session.nom, email: req.session.email, filiere: req.session.filiere, niveau: req.session.niveau, etat: req.session.etat,sujet: req.session.sujet,encadrant:req.session.encadrant})
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
    const q = "INSERT INTO `PFE-app`.`etudiant`(`Nom`,`filiere`,`niveau`,`email`, `password`) VALUES (?, ?, ?, ?, ?)";
  
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
app.post("/Entreprise/Form", (req, res) => {
  const q = "INSERT INTO `PFE-app`.`entreprise`(`nom`,`adresse`,`email`,`sujet`,`niveau`,`demande_partenariat`) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [
    req.body.nom,
    req.body.adresse,
    req.body.email,
    req.body.sujet,
    req.body.niveau,
    req.body.demande_partenariat
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
app.post("/Student/Profile", (req, res) => {
  const q = "UPDATE `PFE-app`.`etudiant` SET `sujet`=? WHERE `email`=? ";
  const values = [
    req.body.sujet,
    req.body.email,
  ];
  db.query(q, values, (err, result) => {
    if (err) {
      console.log("Error while executing query:", err);
      res.status(500).send("An error occurred while processing your request.");
    } else {
      console.log("Data inserted successfully!");
      res.status(200).send("Data inserted successfully!");
    }
  });})
  app.post("/Coordinateur/ListeTopic", (req, res) => {
    const q = "UPDATE `PFE-app`.`etudiant` SET `etat`=?, `encadrant`=? WHERE `email`=?";
    const values = [
      req.body.etat,
      req.body.encadrant,
      req.body.email,
    ];
    db.query(q, values, (err, result) => {
      if (err) {
        console.log("Error while executing query:", err);
        res.status(500).send("An error occurred while processing your request.");
      } else {
        console.log("Data updated successfully!");
        res.status(200).send("Data updated successfully!");
      }
    });
  });
  
app.post('/Student/Login', (req, res) => {
  const sql = "SELECT * FROM `PFE-app`.`etudiant` WHERE `email`=? AND `password`=? ";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if(err) return res.json({Message:"Error inside server"});
    if(result.length > 0) {
      req.session.nom = result[0].nom
      req.session.email = result[0].email
      req.session.filiere = result[0].filiere
      req.session.niveau = result[0].niveau
      req.session.etat = result[0].etat
      req.session.encadrant = result[0].encadrant
      req.session.sujet = result[0].sujet
      return res.json({Login: true})
    } else{
        return res.json({Login: false})
    }
  })
})

app.get('/Student/Topics', (req, res) => {
  const sql = "SELECT * FROM `PFE-app`.`entreprise` ";
  db.query(sql, (err, results) => {
    if(err) return res.json({Message:"Error inside server"});
   else{
    return res.json(results);

   }
  })
})
app.post('/Coordinateur/Login', (req, res) => {
  const sql = "SELECT * FROM `PFE-app`.`coordinateur` WHERE `email`=? AND `password`=? ";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if(err) return res.json({Message:"Error inside server"});
    if(result.length > 0) {
      req.session.nom = result[0].nom
      req.session.filiere = result[0].filiere
      req.session.email = result[0].email
      return res.json({Login: true})
    } else{
        return res.json({Login: false})
    }
  })
})

app.get('/Coordinateur/ListeTopic', (req, res) => {
  const filiere = req.query.filiere; 

  const sql = "SELECT d.nom, d.sujet, d.niveau, d.email FROM `PFE-app`.`etudiant` AS d " +
              "JOIN `PFE-app`.`coordinateur` AS c ON d.filiere = c.filiere " +
              "WHERE c.filiere = ? " +
              "ORDER BY d.niveau";

  db.query(sql, [filiere], (err, results) => {
    if (err) {
      console.error('Error retrieving data from table: ', err);
      res.status(500).send('Error retrieving data from table');
    } else {
      return res.json(results);
    }
  });
});




const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
