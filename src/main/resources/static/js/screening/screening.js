
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
    let selectedScreenings;

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
        $('.schedule-container').fadeIn('slow');

        selectedScreenings = selectedScreenings.filter(s => s.theater.id === theater.id);
        let events = createEvents(selectedScreenings);
        console.log("events:",events)
        f();
    });

    function f() {
        let timetable = new Timetable();

        // const theaterNames = theaterList.map(theater => theater.name);
        timetable.addLocations([ 'Nile']);

        // const openHour = parseInt(selectedDaySchedule.openingHour.slice(0,2));
        // const closeHour = parseInt(selectedDaySchedule.closingHour.slice(0,2));

        // timetable.setScope(openHour, closeHour === 23 ? 0 : closeHour + 1); // optional, only whole hours between 0 and 23

        //addEvent(name, location, startDate, endDate[, options])
        timetable.addEvent(movieTitle,'Nile' , new Date(2015,7,17,10,45), new Date(2015,7,17,12,30));

        let renderer = new Timetable.Renderer(timetable);
        renderer.draw('.schedule-container');

    }


    modalDate.change(function () {
        $('.theater-container').fadeIn('slow');

        const selectedDate = moment(modalDate.val()).format("YYYY-MM-DD");

        // get all the screenings for the selected date
        $.getJSON(`/api/screenings/date/${selectedDate}`)
            .done(function(data) {
                    // return selectedScreenings = data.filter(s => s.theater.id === theater.id);
                    selectedScreenings = data;
                    // console.log(selectedScreenings);
                }
            );


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

});