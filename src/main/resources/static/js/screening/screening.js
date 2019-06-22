
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

    let isFilled=false;

    //Fucntion which verifies the input of the user
    function verifyInput() {
        isFilled=true;
        if(modalPrice.val()=="" || modalPrice.val()<=0){
            isFilled=false;
        }
        if(modalDate.val()=="" || modalDate.val == null){
            isFilled=false;
        }
        if(modalTime.val()=="" || modalTime.val == null){
            isFilled=false;
        }
        return isFilled;
    }

    let movieId,movieTitle;
    let theater;
    let screeningId;
    let isAdd;
    let tr;
    let openHour,closeHour;


    /*
    When a movie is clicked this method saves the
    Id and Name of the selected movie and
    displays the screenings for it
     */
    movieTable.on('click','.cool-pointer', function () {

        let row = $(this).closest('tr');
        movieId = row.attr('data-movieid');
        movieTitle = row.attr('data-movieTitle');

        // $('.date-container').hide();
        // $('.time-container').hide();

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

        //disable dates before today by setting the min value
        //https://stackoverflow.com/a/50405795
        document.getElementById('modalDate').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
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
        // $('.date-container').fadeIn('slow');
        $('.time-container').fadeIn('slow');


    });

    function buildSchedule (){
        // $('#schedule').timespace(options, callback)

        $('#schedule').timespace({
            startTime: openHour,
            endTime: closeHour,
            selectedEvent: -1,
            // markerIncrement:5,
            data: {
                headings: [
                    // {start: 0, end: 6, title: 'Night'},
                    // {start: 6, end: 12, title: 'Morning'},
                    // {start: 12, end: 18, title: 'Afternoon'},
                    // {start: 18, end: 24, title: 'Evening'},
                ],
                events: [
                    // {start: 6.50, title: 'Breakfast', description: 'Eat a healthy breakfast.'},
                    // {start: 8, end: 10, title: 'Walk', description: 'Go for a walk.'},
                    // {start: 14, title: 'Lunch', description: 'Eat a healthy lunch.'},
                    // {start: 14.75, title: 'Confirm Appointment', noDetails: true},
                    {start: 17.75, end: 20, title: 'Bring Supplies'},
                ]
            }
        });

    }

    modalDate.change(function () {
        $('.theater-container').fadeIn('slow');

        // $('.time-container').fadeIn('slow');
        // const selectedDate = moment(modalDate.val()).format("YYYY-MM-DD");

        const selectedDaySchedule = cinema.schedule.find(day => day.dayNo === moment(modalDate.val()).isoWeekday());

        openHour = parseInt(selectedDaySchedule.openingHour.slice(0,2));
        closeHour = parseInt(selectedDaySchedule.closingHour.slice(0,2));


    })



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

        if (verifyInput()) {
            if (isAdd) {
                addScreening(screening, movieTitle)
                screeningModal.disableButton();
            } else {
                screening["id"] = screeningId;
                editScreening(screening, movieTitle, tr);
                screeningModal.disableButton();
            }
        } else {
            alert("Please validate the fields and ensure that the date is set in the future");
        }
    });


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
            setTimeout(function(){ modal.modal('hide');},100);
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