$('form button').click(function () {
  const $nombre = $('input[name="nombre"]').val();
  const $apellido = $('input[name="apellido"]').val();
  const $telefono = $('input[name="telefono"]').val();
  const $email = $('input[name="email"]').val();

  const validarNumero = /^\d+$/;

  const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // el texto cumple con la expresion regular, .test() retorna true
  if (validarNumero.test($telefono) === false) {
    $("#ex1 p").html("El campo sólo pueden ser números");
    $("#ex1").modal();
    return;
  }

  if (validarEmail.test($email) === false) {
    $("#ex1 p").html("El e-mail es inválido");
    $("#ex1").modal();
    return;
  }

  let elNuevoUsuario = {
    nombre: $nombre,
    apellido: $apellido,
    email: $email,
    telefono: $telefono
  };

  $.ajax('http://localhost:3000/api/users', {
    method: 'POST',
    data: elNuevoUsuario
  })
  .done(function () {
    $("#ex1").modal();
  })
  .fail(function (err) {
    alert('salio mal');
    console.log('salio todo mal: ', err);
  })
});