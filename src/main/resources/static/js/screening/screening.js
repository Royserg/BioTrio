
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

    let movieId,movieTitle,screeningId;
    let isAdd,tr;
    let openHour,closeHour;
    let selectedScreenings;
    let theater = null;


    /*
    When a movie is clicked this method saves the
    Id and Name of the selected movie and
    displays the screenings for it
     */
    movieTable.on('click','.cool-pointer', function () {

        let row = $(this).closest('tr');
        movieId = row.attr('data-movieid');
        movieTitle = row.attr('data-movieTitle');

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

        getScreenings();

        $.getJSON(`/api/screenings/${screeningId}`)
            .done(function(screening) {

                    populateModal(screening,movieTitle);
                    createSchedule();

                    theater = screening.theater;
                }
            )
    }

    //gets which theater has been selected from the modal and
    //reveals the next container for date and price
    $('#modalTheater').on('click', 'li', function() {

        clearSchedule();

        // https://stackoverflow.com/a/2888447
        const theaterId = $(this).data('theater_id');
        toggleListItemSelectedClass($(this));

        theaterList.forEach(function (t) {
            if(t.id==theaterId){
                theater=t;
            }
        })

        $('.timetable').fadeIn('slow');
        $('.time-container').fadeIn('slow');

        createSchedule();

    });

    function filterScreenings(theater,selectedScreenings){
        return selectedScreenings.filter(s => s.theater.id === theater.id);
    }

    function createSchedule(){
        // getScreenings();
        let screenings = filterScreenings(theater,selectedScreenings);
        let timetable = createEvents(screenings,openHour,closeHour);

        return timetable;
    }

    modalDate.change(function () {
        $('.theater-container').fadeIn('slow');

        clearSchedule();
        getScreenings();

        if(theater !== null) {
            createSchedule();
        }

        const selectedDaySchedule = cinema.schedule.find(day => day.dayNo === moment(modalDate.val()).isoWeekday());
        openHour = parseInt(selectedDaySchedule.openingHour.slice(0,2));
        closeHour = parseInt(selectedDaySchedule.closingHour.slice(0,2));

    })

    function getScreenings () {
        const selectedDate = moment(modalDate.val()).format("YYYY-MM-DD");

        // get all the screenings for the selected date
        $.getJSON(`/api/screenings/date/${selectedDate}`)
            .done(function(data) {
                    if (typeof(data) === "string"){
                        selectedScreenings = JSON.parse(data)
                    }
                    else {
                        selectedScreenings = data;
                    }
                }
            );
    }

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

});