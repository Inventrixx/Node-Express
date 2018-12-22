$('form button').click(function () {
  const $nombre = $('input[name="nombre"]').val();
  const $apellido = $('input[name="apellido"]').val();
  const $telefono = $('input[name="telefono"]').val();
  const $email = $('input[name="email"]').val();

  const validarNumero = /^\d+$/;

  const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // el texto cumple con la expresion regular, .test() retorna true
  if (validarNumero.test($telefono) === false) {
    alert('el teléfono solo tienen que ser números');
    return;
  }

  if (validarEmail.test($email) === false) {
    alert('mandaste fruta con el email');
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
    alert('usuario creado!');
    location.href = '/users';
  })
  .fail(function (err) {
    alert('salio mal');
    console.log('salio todo mal: ', err);
  })
});