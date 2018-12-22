//manipulación de objetos y arrays
//devuelve el array de objetos, escuchando distintas rutas

//me traigo express

const express = require("express");


const router = express.Router();
const users = [
  {
    id: 1,
    nombre: "Ada",
    apellido: "Lovelace",
    telefono: "1234567890",
    email: "contacto@gmail.com"
  },
  {
    id: 2,
    nombre: "Grace",
    apellido: "Hopper",
    telefono: "087654321",
    email: "contacto@hotmail.com"
  }
];

let contador = 3;

//validaciones
const validarNumero = /^\d+$/;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//filtro
router.get("/users", (req, res) => {
  let miBusqueda = req.query.search;

  if (miBusqueda && miBusqueda.length >0)
  //si miBusqueda fuese undefined, me devolvería false
  {
    //cuando filtre mis usuarios, voy a devolver esos mismos.
    let usersFiltrados = [];
    miBusqueda = miBusqueda.toLowerCase();
    for(let i = 0; i < users.length; i++) {
      const nombre = users[i].nombre.toLowerCase();
      const apellido = users[i].apellido.toLowerCase();
      const telefono = users[i].telefono.toLowerCase();
      const email = users[i].email.toLowerCase();
      if (nombre.indexOf(miBusqueda) >= 0 || apellido.indexOf(miBusqueda) >= 0|| telefono.indexOf(miBusqueda) >= 0|| email.indexOf(miBusqueda) >= 0) {
        usersFiltrados.push(users[i]);
      }
    }
    return res.json(usersFiltrados);
  }

  res.json(users)
})

router.delete("/users/:id", (req, res) =>{
  //el parseInt lo usamos porque nuestro "req.params.id" es un string
  //necesito pasar el string a un entero así se matchea correctamente
  const userId = parseInt(req.params.id);
  users.splice(users.findIndex(u => u.id === userId), 1)
  res.json(users)
})

router.get("/users/:id", (req, res)=> {
  //0) recupero mi parámetro id
  const id = parseInt(req.params.id);
  //1) findeIndex
    const userIndex = users.findIndex( user => user.id === id)
    res.json(users[userIndex]);
})

//new user
router.post('/users', function (req, res) {
  // la info que me llega desde la web
  // {
  //     nombre: '',
  //     apellido: '',
  //     telefono: '',
  //     email: ''
  // }
  const newUser = req.body;

  if (newUser.nombre.length > 30) {
      return res.status(418).end('I AM TEAPOT');
  }

  if (newUser.apellido.length > 30) {
    return res.status(418).end('I AM TEAPOT');
}
  if (!emailRegex.test(newUser.email)) {
    return res.status(418).end('I AM TEAPOT');

  }

  if (!validarNumero.test(newUser.telefono)) {
    return res.status(418).end("I AM TEAPOT")
  }
  

  newUser.id = contador++;

  // agrego el usuario al array global
  users.push(newUser);

  // le respondemos con el array de objetos
  res.json(newUser);
});


router.put("/users/:id", (req, res) =>{
  //necesito que la url que ingrese vaya a buscar cada usuario 
  //(mis objetos), los encuentre y modifique ese atributo
  //imago que tendré que hacer algo con req.body
  const idUser = parseInt(req.params.id)
  const miUser = users.find(u => u.id === idUser)

  if (miUser.nombre.length > 30) {
    return res.status(418).end('I AM TEAPOT');
}

if (miUser.apellido.length > 30) {
  return res.status(418).end('I AM TEAPOT');
}
if (!emailRegex.test(miUser.email)) {
  return res.status(418).end('I AM TEAPOT');

}

if (!validarNumero.test(miUser.telefono)) {
  return res.status(418).end("I AM TEAPOT")
}

  
  miUser.nombre = req.body.nombre || miUser.nombre;
  miUser.apellido = req.body.apellido || miUser.apellido;
  miUser.email = req.body.email || miUser.email;
  miUser.telefono = req.body.telefono || miUser.telefono;

 
  
  res.json(miUser)
})


module.exports = router;