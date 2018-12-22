const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
//urlParams.get es un método propio 
//
const id = urlParams.get("id");

const validarNumero = /^\d+$/;

const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



const $nombre = $("input[name='nombre']");
const $apellido = $("input[name='apellido']");
const $telefono = $("input[name='telefono']");
const $email = $("input[name='email']");

$.ajax(`/api/users/${id}`).done(function(user){
  $nombre.val(user.nombre);
  $apellido.val(user.apellido);
  $telefono.val(user.telefono);
  $email.val(user.email);
})

$("form button").click(function(){
  //validando los campos
  if (!validarNumero.test($telefono)) {
    alert('el teléfono solo tienen que ser números');
    return;
  }

  if (!validarEmail.test($email)) {
    alert('mandaste fruta con el email');
    return;
  }
  $.ajax(`/api/users/${id}`,{
    method: "PUT",
    data: {
      nombre: $nombre.val(),
      apellido: $apellido.val(),
      telefono: $telefono.val(),
      email: $email.val(),
    },
    /*otra forma de hacerlo
    .done(function(){...}) */
    success: function() {
      alert("todo editado");
      location.href = `/users`;
    }
  })
})