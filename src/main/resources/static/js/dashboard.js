$(function() {
    console.log("jquery loaded");


    // editing opening hours

    $('.scheduleCard').off('click').on('click', '.btn-edit', function(e) {

        e.preventDefault();

        // read the previous data to fill it in later
        let row = $(this).closest('li');
        let previousSchedule = row.children('span')[1].innerHTML;
        let schedules = previousSchedule.split(" - ", 2);
        let previousOpening = schedules[0];
        let previousClosing = schedules[1];

        // change the id of the chosen element so that it can be replaceable with new tags
        $(this).prev().attr("id", "scheduleToEdit");

        // when click edit button, change the text field into input field
        // also change the edit button into save button
        $('#scheduleToEdit').replaceWith(`<span id="scheduleToEdit"><input type="time" id="openingTime"/> - <input type="time" id="closingTime" max="23:59:00" required/></span>`);
        $('#openingTime').val(previousOpening);
        $('#closingTime').val(previousClosing);
        $(this).replaceWith(`<button
                                    id = "saveScheduleButton"
                                    class="btn btn-outline-dark btn-save"
                                    title="save">
                                    <span class="far fa-save"></span>
                             </button>`);

        // disable the other edit buttons
        $('.btn-edit').each((index, button) => {
            button.disabled = true;
        });
    });

    // save and then replace the button back
    $('.list-group').on('click', '.btn-save', function() {
        let row = $(this).closest('li');
        let dayNo = row.data('dayno');

        let openingHourInput = $('#openingTime').val();
        let closingHourInput = $('#closingTime').val();

        if(openingHourInput > closingHourInput) {
            alert('Opening time cannot be later then closing time.');
        } else {

        let day = {
            'dayNo': dayNo,
            'openingHour': $('#openingTime').val(),
            'closingHour': $('#closingTime').val(),
            'cinemaId': row.data('cinemaid')
        };

        $.ajax({

            type: 'PUT',
            url: `/api/schedule/${dayNo}`,
            dataType: 'html',
            data: JSON.stringify(day),
            contentType: 'application/json'

        })
            .done(function () {

                // make the buttons available
                $('.btn-edit').each((index, button) => {
                    button.disabled = false;
                });

                // replace the text
                $('#scheduleToEdit').replaceWith(`<span id="schedule">${day.openingHour} - ${day.closingHour}</span>`);

                // replace the button
                $('#saveScheduleButton').replaceWith(`<button
                                                id = "editScheduleButton"
                                                class="btn btn-outline-dark btn-edit"
                                                title="edit">
                                            <span class="fas fa-edit"></span>
                                        </button>`);


                // fancy css
                row.css('background', 'gold');
                row.fadeOut(300, function () {
                    $(this).fadeIn(300);
                    $(this).css('background', 'white');
                });

            })
        }
    });



    // showing statistics

    let bookings = [];
    let screenings = [];
    let tickets = [];

    // get today
    let date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let today = date.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    let screeningCount = 0;
    let screeningDate;
    let futureScreening = 0;

    // Get all screenings, store in 'screenings' array
    $.ajax(`/api/screenings/`,
        {
            // success callback function
            success: (data) => {

                $.each(data, (index, screening) => {
                    screenings.push(screening);

                    // calculate the total number of screenings
                    screeningCount += 1;

                    // calculate the total number of future screenings
                    screeningDate = screening.date;
                    if(screeningDate >= today) {
                        futureScreening += 1;
                    }
                });

                // display the outcome
                $('.total-screenings').text(screeningCount);
                $('.future-screenings').text(futureScreening);

            }
        });

    let ticketCount = 0, bookingCount = 0, ticketPrice = 0, totalSales = 0;
    //Get all bookings, store in 'bookings' array
    $.ajax(`/api/bookings/all`,
        {
            // success callback function
            success: (data) => {

                $.each(data, (index, booking) => {
                    bookings.push(booking);

                    // calculate the total number of bookings
                    bookingCount++;

                    // get the ticket price for each booking
                    ticketPrice = booking.screening.price;

                    // calculate the total ticket sales
                    totalSales = totalSales + ticketPrice;

                    // loop through each booking, get the amount of tickets
                    $.each(booking.tickets, (index, ticket) => {

                        tickets.push(ticket);
                        ticketCount++;

                    });

                });

                // display the outcome
                $('.total-bookings').text(bookingCount);
                $('.total-tickets').text(ticketCount);
                $('.total-sales').text(totalSales);


            }
        });

});
