$(function(){
  // Movie id read from url
  const movieId = window.location.pathname.split('/')[2];
  // References to html elements
  const screeningTimes = $('.screening-times');
  const seatsContainer = $('.seats-container');

  // Variable containing info about all screenings for a particular movie
  let allScreenings = [];

  // Create representation of an booking object for sending to Backend
  const newBooking = {
    'customerPhoneNumber': '',
    'tickets': [],
    'screening': {}
  };


  // Fetch all screenings for selected movie
  $.ajax(`/api/movies/${movieId}/screenings`)
    .done(screenings => {
      console.log('screenings', screenings);
      // Keep all screenings in the global variable
      allScreenings = screenings;
      // Show Select field with all possible dates for this movie
      displayDates(screenings);

      // Display times for first date populated in the select field
      $('#dateField option').eq(0).change();
    });


  // Trigger event when the date is changed
  $('#dateField').change(function() {
    // Hide seats container
    seatsContainer.fadeOut();

    // Clear screening times list
    screeningTimes.html('');

    const selectedDate = $(this).val();
    // Extract screenings for selected date
    const screeningsForDate = allScreenings.filter(screening => screening.date === selectedDate);

    screeningsForDate.forEach(screening => {
      screeningTimes
        .append(`<li class="list-group-item" data-screeningid="${screening.id}">${screening.time.slice(0,-3)}</li>`)
    })

  });



  /* Functions */
  function validateBookingInfo() {
    if ($('.seat__selected').length < 1) {
      alert('Select at least 1 seat');
      return false;
    }
    if ($('#phoneNum').val().length < 4) {
      alert('Please, enter correct phone number');
      return false;
    }

    return true;
  }

  // Function filtering out all unique dates and displaying them in the select field
  function displayDates(screenings) {
    const dates = screenings.map(s => s.date);
    // Filter out unique dates
    const uniqueDates = [...new Set(dates)];

    uniqueDates.forEach(date => {
      $('#dateField').append(`<option value=${date}>${date}</option>`);
    });
  }

  // Screening time clicked will mark selected option
  // and display/update seats for that screening
  screeningTimes.on('click', 'li', function() {
    toggleListItemSelectedClass($(this));
    // Get screening id from data attribute
    const screeningId = $(this).data('screeningid');
    const selectedScreening = allScreenings.find(screening => screening.id === screeningId);

    // Save screening and theater into new Booking
    newBooking.screening = selectedScreening;
    newBooking.theater = selectedScreening.theater;

    // Save price of the screening as data attribute
    $('#seatsGrid').data('ticket-price', selectedScreening.price);

    // Fetch all tickets for selected screening
    $.ajax(`/api/screenings/${screeningId}/tickets`)
      .then(tickets => {
        // Find theater in which screening will be played
        const theater = selectedScreening.theater;
        // Generate seats array
        const seatsArray = generateSeatsGrid(theater, tickets);
        // Fill modal with seats grid
        fillSeatsGrid(seatsArray);

        // Show seats container
        seatsContainer.fadeOut(100, function() { $(this).fadeIn() })

      })
  });

  // Function checking if seats are selected and phone number entered
  // Then displaying a modal with the booking summary
  $('#prepareBookingBtn').click(function(){

    // Proceed if necessary information is completed
    if (validateBookingInfo()) {

      // Prepare tickets and phone number
      newBooking.tickets = $.makeArray($('.seat__selected')).map(seat => {
        return {
          rowNo: seat.dataset.row,
          columnNo: seat.dataset.column
        }
      });

      newBooking.customerPhoneNumber = $('#phoneNum').val();
      // Prepare tickets and phone number == end

      console.log(newBooking);
      // Populate data in the modal
      showBookingSummary(newBooking);

      bookingModal.showModal(false, 'Booking Summary', 'Book tickets');
    }

  });


  function showBookingSummary(booking) {
    const modalBody = $('.modal-body');
    // Clear modal
    modalBody.html('');

    // Prepare tickets list
    const ticketsList = $(`<ul class="list-group"></ul>`);

    booking.tickets.forEach(ticket => {
      ticketsList.append(`<li class="list-group-item">row: ${ticket.rowNo}, column: ${ticket.columnNo}</li>`);
    });

    // Attach movie title
    modalBody
      .append(`<h2 class="mb-4 mt-2"><span class="text-muted">Movie: </span>${$('.movie-title').text()}</h2>`)
      .append('<h5 class="text-muted">Tickets:</h5>')
      .append(ticketsList)
      .append(`<h5 class="mt-3 mb-3"><span class="text-muted">Time: </span>${booking.screening.time.slice(0, -3)}</h5>`)
      .append(`<h5 class="mt-3 mb-3"><span class="text-muted">Theater: </span>${booking.theater.name}</h5>`)
      .append(`<h5 class="mt-3 mb-3"><span class="text-muted">Phone number: </span>${booking.customerPhoneNumber}</h5>`)
      .append(`<h5 class="mt-3 mb-3"><span class="text-muted">Total price: </span>${booking.screening.price * booking.tickets.length} dkk</h5>`);


  }

  $('#submitBtn').click(function() {
    // Disable submit btn
    bookingModal.disableButton();

    // Send post request to add new booking into Database
    $.ajax({
      type: 'POST',
      url:'/api/bookings',
      dataType: 'json',
      data: JSON.stringify(newBooking),
      contentType: 'application/json; charset=utf-8'
    })
      .done(bookingId => {
          // Add feedback div
          $(`<div class="alert alert-success" role="alert">Successfully Booked </div>`)
            .hide()
            .appendTo('.modal-body')
            .fadeIn('slow', function() {
              $('#submitBtn').text('Redirecting...');

              setTimeout(() => {
                window.location.replace('/page');
              }, 2000)
            });
      });
  })

});