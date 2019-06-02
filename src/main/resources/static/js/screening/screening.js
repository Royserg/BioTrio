
$(function () {

    //stops carousel from auto sliding
    $('.carousel').carousel({
        interval: false
    });

    const movieTable = $('#movieTable');
    const screeningTableBody = $('#screeningTable').children('tbody');
    const modal = $('#screeningModal');
    const modalMovie = $('#modalScreeningMovie');
    const modalTheater = $('#modalTheater');
    const modalPrice = $('#modalPrice');
    const modalDate = $('#modalDate');
    const modalTime = $('#modalTime');
    const addButton = $('#addButton');
    const submitButton = $('#submitButton');
    const prevButton = $('#prev');

    let movieId,movieTitle;
    let theater;
    let isAdd;
    let screeningId;
    let newRow,tr;

    movieTable.on('click','.cool-pointer', function () {

        let row = $(this).closest('tr');
        movieId = row.attr('data-movieid');
        movieTitle = row.attr('data-movieTitle');

        $('.carousel').carousel('next');

        $('h4').text('Screenings');
        addButton.text("Add Screening");
        addButton.removeClass("add-movie");
        addButton.addClass("add-scr");
        prevButton.removeClass("invisible");

        populateScreeningTable(movieId);

    })

    //https://stackoverflow.com/a/28108858
    $(document).on('click','#addButton.add-scr', function() {
        clearModal(modal);
        isAdd = true;
        modalMovie.val(movieTitle);
        $('.modal-title').text('Add Screening');
        modal.modal("show");

        // Change submit button color to primary color
        submitButton.removeClass('btn-warning').addClass('btn-primary');
    });

    screeningTableBody.on('click','.btn-edit', function () {

        // Change submit button color to yellow
        submitButton.removeClass('btn-primary').addClass('btn-warning');

        clearModal(modal);
        isAdd = false;

        tr = $(this).closest('tr');
        screeningId = tr.data('screeningid');

        $('.modal-title').text('Edit Screening');
        populateEditModal(screeningId);
        modal.modal("show");

    });

    //can be moved to utilities if screeningsList is not used elsewhere
    function populateScreeningTable(movieId){

        $.getJSON(`/api/movies/${movieId}/screenings`)
          .done(function(screeningsList) {
              if(screeningsList.length > 0){
                  screeningsList.forEach(function (s) {
                      const $row = buildTableRow(s,movieTitle);
                      screeningTableBody.append($row);
                      $("#screeningTable caption").text("List of screenings");
                  })
              }
              else {
                  $("#screeningTable caption").text("No screenings available");
              }
          })
    }

    function populateEditModal(screeningId){

        $.getJSON(`/api/screenings/${screeningId}`)
            .done(function(screening) {

                    populateModal(screening,movieTitle);

                    theater = s.theater;
                }
            )
    }
    $('#modalTheater').on('click', 'li', function() {
        // https://stackoverflow.com/a/2888447
        const theaterId = $(this).data('theater_id');
        toggleListItemSelectedClass($(this));

        theaterList.forEach(function (t) {
            if(t.id==theaterId){
                theater=t;
            }
        })
        $('.date-container').fadeIn('slow');

    });

    modalDate.change(function () {
        $('.time-container').fadeIn('slow');})

    submitButton.click(function() {
        let screening = {
            "movieId": movieId,
            "theater": theater,
            "price": modalPrice.val(),
            "date": modalDate.val(),
            "time": modalTime.val()
        }

        if(isAdd) {
            addScreening(screening,movieTitle)
        }
        else {
            screening["id"]=screeningId;
            editScreening (screening,movieTitle,tr);
        }

         setTimeout(function(){ modal.modal('hide');},100);
    })


});