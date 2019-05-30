
$(function () {
    /*
    const modal = $('#modal');
    const modalMovie = $('#modalMovie');
    const modalTheater = $('#modalTheater');
    const modalPrice = $('#modalPrice');
    const modalDate = $('#modalDate');
    const modalTime = $('#modalTime');

    const screeningTable = $('#screeningTable');
    const tableBody = $('tbody');

    const addButton = $('#addScreeningButton');
    const submitButton = $('#submitButton');

    let tr;
    let newRow;
    let movie;
    let theater;
    let screeningId;
    let selectedScreening;
    let isAdd = false;

    //TODO make table header sticky

    addButton.click(function () {

        isAdd = true;
        modal.clearModal();
        $('.modal-title').text('Add Screening');
        modal.modal("show");

    });

    screeningTable.on('click','.btn-warning', function () {

        isAdd = false;
        tr = $(this).closest('tr');

        modal.clearModal();
        $('.modal-title').text('Edit Screening');
        screeningId = $(this).attr('data-screeningid');
        populateEditModal(screeningId);
        modal.modal("show");

    });

    submitButton.click(function() {

        let screening = {
            "movie": movie,
            "theater": theater,
            "price": modalPrice.val(),
            "date": modalDate.val(),
            "time": modalTime.val()
        }

        if(isAdd) {
            $.ajax({
                type: "POST",
                url: "/api/screenings",
                dataType: "json",
                data: JSON.stringify(screening),
                contentType: "application/json; charset=utf-8",
                success: function (id) {
                    screening["id"]=id;
                    updateTable(screening);
                    tableBody.append(newRow);
                    $('#table-container').scrollTop($('#table-container')[0].scrollHeight);
                }
            })
        }
        else {

            screening["id"]=screeningId;

            $.ajax({
                type: 'PUT',
                url: `api/screenings`,
                dataType: 'html',
                data: JSON.stringify(screening),
                contentType: 'application/json; charset=utf-8',
            })
                .done(function () {
                    updateTable(screening);
                    tr.replaceWith(newRow);
                })
        }

        setTimeout(function(){ $('#modal').modal('hide');},100);
    })

    modalMovie.change(function () {

        const movieId = $(this).children(":selected").data('movie_id');

        // gets the selected movie
        $.ajax(`/api/movie/${movieId}`,   // request url

            {
                success: function (data) {// success callback function

                   movie = data;
                   return movie;
                }
            });
    })

    modalTheater.change(function () {

        // https://stackoverflow.com/a/2888447
        const theaterId = $(this).children(":selected").data('theater_id');

        $.ajax(`/api/theaters/${theaterId}`,   // request url
            {
                success: function (data) {// success callback function

                    theater = data;
                    return theater;
                }
            });
    })

    function populateEditModal (screeningId) {

        $.ajax(`/api/screenings/${screeningId}`,   // request url
            {
                success: function (data) {// success callback function

                   selectedScreening = data;

                    //populates the modal with data about the selected screening
                    modalMovie.val(selectedScreening.movie.title);
                    modalTheater.val(selectedScreening.theater.name);
                    modalDate.val(selectedScreening.date);
                    modalTime.val(selectedScreening.time);
                    modalPrice.val(selectedScreening.price);

                    movie = selectedScreening.movie;
                    theater = selectedScreening.theater;
                }
            });
    }

    $.fn.clearModal = function () {

        $('#modal').on('hidden.bs.modal', function() {
            $(this)
                .find("input,textarea,select")
                .val('')
                .end();
        });
    };

    function updateTable(screening){

        newRow = `<tr class="d-flex">
                          <td class="col-2">${movie.title} </td>
                          <td class="col-2">${theater.name}</td>
                          <td class="col-2">${screening.date}</td>
                          <td class="col-2">${screening.time}</td>
                          <td class="col-2">${screening.price}</td> <td class="col-1">
                              <button id = "editButton" 
                                 class="btn btn-warning"
                                 data-toggle="modal"
                                 data-target="#modal"
                                 data-screeningid="${screening.id}">
                                  <span class="fas fa-edit"></span>
                              </button>
                          </td>
                          <td class="col-1">
                              <button data-screeningid="${screening.id}",
                                      data-screeningmovie="${screening.movie.title}"
                                      class="btn btn-danger">
                                  <span class="fas fa-trash"></span>
                              </button>
                          </td>
                      </tr>`

    }
*/
});