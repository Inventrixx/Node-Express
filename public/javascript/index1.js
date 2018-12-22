//Parte cliente

const $tableUsers = $(".tableUsers")
$.ajax("/api/users").done(function(data){
  haciendoMiTablaDeUsuarios(data);
})

function haciendoMiTablaDeUsuarios(users)  {
  for (let i = 0; i < users.length; i++) {
    $tableUsers.append(`
    <tr class='fila'  data-id=${users[i].id}>
        <td>${users[i].nombre}</td>
        <td>${users[i].apellido}</td>
        <td>${users[i].telefono}</td>
        <td>${users[i].email}</td>
        <td><button class="btn edit" id="put">Editar</button></td>
        <td><button class="btn delete" id="borrar">Borrar</button></td>
    </tr>
`);
}
}

$(document).on("click", ".btn.delete", function(){
  const id = $(this).parent().parent().data("id")
  $(this).parent().parent().remove()
  $.ajax(`/api/users/${id}`, {method:`delete`})
})

$(document).on("click", ".btn.edit", function(){
  const id = $(this).parent().parent().data("id");
  //con location href rederigimos a la ruta que le mandamos
  location.href = `/users/edit?id=${id}`;
})

$(document).on("click", ".btn-filter", function(){
  //lo importante es que cuando yo ponga valores en mi input
  //busque en "base de datos" lo que coincida
  const miBusqueda = $("input[name='filter']").val();
  console.log(miBusqueda)
 
  //miBusqueda tiene que ser el parámetro para buscar en mi base de datos
  //después del signo de pregunta es un 'queryParam'

  $.ajax(`/api/users?search=${miBusqueda}`)
  .done(function (data){
    $(".fila").remove();
    haciendoMiTablaDeUsuarios(data);
  })
})
