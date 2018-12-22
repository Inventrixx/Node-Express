//devolución de html

//Me traigo express

const express = require("express");

//2) pedirle a express el Router

const fs = require("fs");

const router = express.Router();
//path es un módulo de node. Me permite usar el ".join"
const path = require("path");


router.get("/estaspensandolomismoqueyobananin", (req, res) => {
  res.send("Claro que sí bananon")
})

router.post("/api/users/new", (req, res)=> {
  let newUser = {
    name: req.body.nombre,
    lastName: req.body.apellido,
    phone: req.body.telefono
  }
  users.push(newUser)
fs.writeFileSync("users.json", JSON.stringify(users))
res.send(req.body);
})

router.get("/users/new", (req, res) => {
  //res.send(__dirname)
  res.sendFile(path.join(__dirname, "..", "new.html"));
});


router.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "", "users.html"))
})

router.get("/users/edit", (req, res)=>{
  res.sendFile(path.join(__dirname, "..", "", "edit.html"))
})

module.exports = router;