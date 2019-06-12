
$(function () {

    // Initialize Screening modal
    const screeningModal = new Modal($('#screeningModal'), $('#submitButton'));

    const movieTable = $('#movieTable');
    const screeningTableBody = $('#screeningTable').children('tbody');
    const modal = $('#screeningModal');
    const modalMovie = $('#modalScreeningMovie');
    const modalPrice = $('#modalPrice');
    const modalDate = $('#modalDate');
    const modalTime = $('#modalTime');
    const submitButton = $('#submitButton');

    let movieId,movieTitle;
    let theater;
    let screeningId;
    let isAdd;
    let tr;


    /*
    When a movie is clicked this method saves the
    Id and Name of the selected movie and
    displays the screenings for it
     */
    movieTable.on('click','.cool-pointer', function () {

        let row = $(this).closest('tr');
        movieId = row.attr('data-movieid');
        movieTitle = row.attr('data-movieTitle');

        $('.date-container').hide();
        $('.time-container').hide();

        prepareScreeningsPage();
        populateScreeningTable(movieId);

    })

    //https://stackoverflow.com/a/28108858
    $(document).on('click','#addButton.add-scr', function() {
        clearModal(modal);
        isAdd = true;
        modalMovie.val(movieTitle);

        // Adjust modal and open it
        screeningModal.showModal(false, 'Add Screening', 'Add Screening');
    });

    screeningTableBody.on('click','.btn-edit', function () {
        clearModal(modal);
        isAdd = false;

        tr = $(this).closest('tr');
        screeningId = tr.data('screeningid');

        populateEditModal(screeningId);

        // Show adjusted modal
        screeningModal.showModal(true, 'Edit Screening', 'Save');

    });

    //Finds the screenings for the selected movie and
    //populates the body of the screenings table
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

    //fills the modal with information from the database for the selected screening
    function populateEditModal(screeningId){

        $.getJSON(`/api/screenings/${screeningId}`)
            .done(function(screening) {

                    populateModal(screening,movieTitle);

                    theater = screening.theater;
                }
            )
    }
    //gets which theater has been selected from the modal and
    //reveals the next container for date and price
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

    //when the save button is clicked
    //this method creates the screening object and calls the respective method
    submitButton.click(function() {
        let screening = {
            "movieId": movieId,
            "theater": theater,
            "price": modalPrice.val(),
            "date": modalDate.val(),
            "time": modalTime.val()
        }

        // Disable submit button
        screeningModal.disableButton();

        if(isAdd) {
            addScreening(screening,movieTitle)
        }
        else {
            screening["id"]=screeningId;
            editScreening (screening,movieTitle,tr);
        }

         setTimeout(function(){ modal.modal('hide');},100);
    })


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

});