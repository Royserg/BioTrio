// Google Calendar

// Client ID and API key from the Developer Console
// Client ID and API key from the Developer Console
const CLIENT_ID = '1025167550617-t52don7ga2rpem7i281v6267trpdaqdo.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAj0zYBtiSadIVuigTmXEH-BvDPo32I89o';
// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events';
const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');
/**
 * On load, called to load the auth2 library and API client library.
 */
function loadClient() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            clientId: CLIENT_ID,
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = () => gapi.auth2.getAuthInstance().signIn();
            signoutButton.onclick = () => gapi.auth2.getAuthInstance().signOut();
        });
    });
}
/**
 * Called when the signed in status changes, to update the UI
 * appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) listUpcomingEvents();
    authorizeButton.style.display = (isSignedIn ? 'none' : 'block');
    signoutButton.style.display = (isSignedIn ? 'block' : 'none');
}
/**
 * Append a pre element to the body with a message.
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    document.getElementById('content')
      .appendChild(document.createTextNode(message + '\n'));
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    console.log(gapi.client.calendar.events.list);
    gapi.client.calendar.events.list({
        calendarId: 'vsgsekfjir60lmvsj094qg6knc@group.calendar.google.com',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime'
    }).then((response) => {
        const events = response.result.items;
        appendPre('Upcoming events:');
        if (events.length > 0) {
            events.map((event) => {
                let when = event.start.dateTime;
                if (!when) {
                    when = event.start.date;
                }
                appendPre(`${event.summary} (${when})`);
            });
        } else {
            appendPre('No upcoming events found.');
        }
    });
}



// Google calendar -- end





$(function() {

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
    $.ajax(`/api/bookings/`,
        {
            // success callback function
            success: (data) => {

                $.each(data, (index, booking) => {
                    bookings.push(booking);

                    // calculate the total number of bookings
                    bookingCount += 1;

                    // get the ticket price for each booking
                    ticketPrice = booking.screening.price;

                    // loop through each booking, get the amount of tickets
                    $.each(booking.tickets, (index, ticket) => {

                        tickets.push(ticket);
                        ticketCount += 1;

                    });

                    // calculate the total ticket sales
                    totalSales += ticketPrice * ticketCount;

                });

                // display the outcome
                $('.total-bookings').text(bookingCount);
                $('.total-tickets').text(ticketCount);
                $('.total-sales').text(totalSales);


            }
        });

});
