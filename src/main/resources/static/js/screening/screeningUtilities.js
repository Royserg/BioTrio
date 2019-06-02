function buildTableRow(screening,movieTitle) {
  const { theater, date, time, price } = screening;

  // Times fetched from database comes in HH:mm:ss format (unnecessary seconds) but when editing a screening,
  // time read from the input has only hours and minutes without seconds. When creating the td for time
  // slice last 3 characters (":00") if time comes with seconds
  const newRow = $(`<tr class="d-flex" data-screeningid=${screening.id}>
                                <td class="col-2 cool-pointer"> ${movieTitle} </td>
                                <td class="col-2"> ${theater.name} </td>
                                <td class="col-2"> ${date} </td>
                                <td class="col-2"> ${time.length > 5 ? time.slice(0, -3) : time} </td>
                                <td class="col-2"> ${price} DKK</td>
                                <td class="col-1">
                                <button class="btn btn-outline-dark btn-edit">
                                  <span class="fas fa-edit"></span>
                              </button>
                          </td>
                          <td class="col-1">
                              <button class="btn btn-outline-dark btn-delete">
                                  <span class="fas fa-trash"></span>
                              </button>
                          </td>
                            </tr> `);
  return newRow;
}

function validateInput(screening) {
  let validated = true;
  if(screening.movieId == null) validated = false;
  if(screening.theater == null) validated = false;
  if(screening.price > 999 || screening.price < 1) validated = false;

  return validated;
}

function clearModal (modal) {

  modal.on('hidden.bs.modal', function() {

    $(this)
      .find("input,textarea,select,li")
      .val('')
      .end()
  });
  $("#modalTheater").children('li').removeClass('list-group-item__selected');
  $('.date-container').hide();
  $('.time-container').hide();

}

function populateModal(screening,movieTitle){


  $('#modalScreeningMovie').val(movieTitle);
  $('#modalDate').val(screening.date);
  $('#modalTime').val(screening.time);
  $('#modalPrice').val(screening.price);

  $('.date-container').show();
  $('.time-container').show();

  //finds the list item which has data attribute equal to the id of
  // the selected screenings theater and adds css to it
  $('[data-theater_id="' + screening.theater.id + '"]').addClass('list-group-item__selected');

}

$('#prev').click(function () {

  clearScreeningsPage();
});

$('#screeningTable').children('tbody').on('click','.cool-pointer', function () {

  clearScreeningsPage();
});

//not sure about the name ????
function clearScreeningsPage() {
  $('.carousel').carousel('prev');
  $('#prev').addClass("invisible");
  $('h4').text('Movies');
  $('#addButton').text("Add Movie");
  $('#addButton').removeClass("add-scr");
  $('#addButton').addClass("add-movie");
  $('#screeningTable').children('tbody').html("");
}

function prepareScreeningsPage() {
  $('.carousel').carousel('next');
  $('h4').text('Screenings');
  $('#addButton').text("Add Screening");
  $('#addButton').removeClass("add-movie");
  $('#addButton').addClass("add-scr");
  $('#prev').removeClass("invisible");
}

function addScreening(screening,movieTitle){
  $.ajax({
    type: "POST",
    url: "/api/screenings",
    dataType: "json",
    data: JSON.stringify(screening),
    contentType: "application/json; charset=utf-8",
  }).done(function (id) {
    screening["id"]=id;
    const $row = buildTableRow(screening,movieTitle);
    $('#screeningTable tbody').append($row);
    $("#screeningTable caption").text("List of screenings");
    $('#screeningTable').children('tbody').scrollTop($('#screeningTable tbody')[0].scrollHeight);
  });
}

function editScreening (screening,movieTitle,tr){
  console.log("sending put request")
  $.ajax({
    type: 'PUT',
    url: `api/screenings/${screening.id}`,
    dataType: 'html',
    data: JSON.stringify(screening),
    contentType: "application/json; charset=utf-8",
  }).done(function () {
    const $row = buildTableRow(screening,movieTitle);
    tr.replaceWith($row);
  })
}

function toggleListItemSelectedClass(element) {
  // Remove selected class from all items
  element.siblings('li').removeClass('list-group-item__selected');
  // Add selected class to the clicked item
  element.toggleClass('list-group-item__selected');
}

//stops carousel from auto sliding
$('.carousel').carousel({
  interval: false
});