// Editing a booking gives possibility
// of changing seats and phone number only
$(function() {

  const datesContainer = $('.dates-container');
  const timesContainer = $('.times-container');

  // Keep information about fetched booking
  let bookingData = null;

  // Get movie data

  $('table').on('click', '.btn-edit', function() {

    // Change Submit Button name
    $('#submitBtn')
      .text('Save Changes')
      .removeClass('btn-primary')
      .addClass('btn-warning');

    const $row = $(this).closest('tr');
    const bookingId = $row.data('bookingid');

    console.log('bookingId', bookingId);
    // Fetch information about the booking
    //  .then start preparing modal elements with booking information
    //  with information about screening, fetch all tickets already booked and
    //  .then prepare seats and show modal
    getBookingInfo(bookingId)
      .then(bookingData => handleBookingData(bookingData))
      .then(ticketsData => displayModal(ticketsData))
  });

  function getBookingInfo(bookingId) {
    return $.ajax({
      url: `/api/bookings/${bookingId}`,
      method: 'GET',
      dataType: 'json'
    })
  }

  function handleBookingData(booking) {

    console.log('booking', booking);
    // Save booking information
    bookingData = booking;

    // Fade out containers
    fadeOutBulk([datesContainer, timesContainer, $('.seats-container')]);

    // Show movie, dates, screening times containers with filled info
    $('#modalTitle').text('Edit Booking');
    $('#moviesList').html(`<p class="list-group-item list-group-item__selected">${booking.movie.title}</p>`);

    datesContainer.fadeIn(100);
    $('#screeningDates').html(`<p class="list-group-item list-group-item__selected">${booking.screening.date}</p>`);

    timesContainer.fadeIn(100);
    $('#screeningTimes').html(`<p class="list-group-item list-group-item__selected">${booking.screening.time}</p>`);

    // Display a phone number
    $('#phoneNum').val(booking.customerPhoneNumber);

    // Attach ticket price to seats grid
    $('#seatsGrid').data('ticket-price', booking.screening.price);

    // Fetch all tickets for this screening in order to calculate columns, rows and display seats
    return $.ajax({
      url: `/api/screenings/${booking.screening.id}/tickets`,
      method: 'GET',
      dataType: 'json'
    })
  }

  function displayModal(screeningTickets) {

    console.log('screening tickets:', screeningTickets);

    // Prepare 2D array for seat grid
    const seatsArray = generateSeatsGrid(bookingData.screening.theater, screeningTickets);

    // Fill modal with seats grid
    fillSeatsGrid(seatsArray);

    // Display edited booking, booked seats as `selected`
    const seatRows = $('#seatsGrid').children();

    bookingData.tickets.forEach(ticket => {
      const seat = seatRows.eq(ticket.rowNo - 1).children().eq(ticket.columnNo - 1);
      // first remove `reserved` class then add `free` and `selected` class
      // class `free` needs to be added because class `selected` might be toggled and we want to keep `free` styling
      seat
        .removeClass('seat__reserved')
        .addClass('seat__free seat__selected');
    });


    // Those count at the end with seats that have class __selected
    $('#ticketsCount').text(bookingData.tickets.length);
    $('#price').text(bookingData.screening.price * bookingData.tickets.length);

    // Show modal footer
    $('.modal-footer').fadeIn(100);

    // Show seats container
    $('.seats-container').fadeIn(100);

    // Open booking modal
    $('#bookingModal').modal('show');

  }

  // Submit Changes made to the booking
  // Trigger action only when submit button has .btn-warning class
  $('.modal-footer').on('click', '#submitBtn.btn-warning', function() {

    const $phoneNumField = $('#phoneNum');
    const $selectedSeats = $('.seat__selected');

    // Don't execute if phoneField is empty or no ticket is selected
    if (!$phoneNumField.val() || $selectedSeats.length === 0) {
      alert("Phone field empty or no ticket selected");
      return
    }
    // Replace bookingData.tickets array with $selectedSeats array and send to backend
    // Convert array-like object into JS array
    const newTickets = $.makeArray($('.seat__selected')).map(function(ticket) {
      return {
        bookingId: bookingData.id,
        rowNo: ticket.dataset.row,
        columnNo: ticket.dataset.column
      }
    });

    // Update booking data
    bookingData.customerPhoneNumber = $phoneNumField.val();
    bookingData.tickets = newTickets;

    console.log('booking data', bookingData);
    console.log('new tickets', newTickets);

    // Send ajax PUT request
    $.ajax({
      url: `/api/bookings/${bookingData.id}`,
      method: 'PUT',
      datType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(bookingData)
    })
      .done(function() {
        // Close booking modal
        $('#bookingModal').modal('hide');

        // Target row that has booking data
        const row = $(`tr[data-bookingid="${bookingData.id}"]`).eq(0);
        row.css('background', 'gold').fadeOut(500, function() {
          // Update phone number in the row
          row.children().eq(3).text(bookingData.customerPhoneNumber);
          $(this).fadeIn(300).css('background-color', 'white');
        })

      });

  });

});
