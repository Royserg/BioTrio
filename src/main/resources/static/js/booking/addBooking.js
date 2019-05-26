$(function(){

  // Keep fetched data about screenings for chosen movie
  let screeningsData = [];
  // Holds selected screening object
  let selectedScreening;

  // Reference to the <div> container for seats
  const seats = $('#seatsGrid');
  // References to particular html list <ul>
  const moviesList = $('#moviesList');
  const timesList = $('#screeningTimes');
  const datesList = $('#screeningDates');


  // Show modal for adding a new booking, with loaded list of movies
  $('#addBookingBtn').click(function() {
    // Change Submit Button name and classes
    $('#submitBtn')
      .text('Book tickets')
      .removeClass('btn-warning')
      .addClass('btn-success');

    // Reset list of movies
    moviesList.html('');
    // Hide containers for booking info, so opening modal again doesn't show previous booking info
    $('.dates-container').fadeOut(100);
    $('.times-container').fadeOut(100);
    $('.seats-container').fadeOut(100);
    $('.modal-footer').fadeOut(100);
    $('#price').text(0);
    $('#ticketsCount').text(0);
    $('#phoneNum').val('');

    // Fetch list of movies and append to the list
    $.ajax('/api/movies', {
      success: function(movies) {
        console.log(movies);
        movies.forEach(movie => {
          $('#moviesList').append(`<li class="list-group-item" data-id=${movie.id}>${movie.title}</li>`);
        });
      }
    });
    // Open modal
    $('#bookingModal').modal();
  });


  // == Movie Pressed ==
  // Fetch screenings for selected movie and show list of dates
  moviesList.on('click', 'li', function() {
    // Read movie id from clicked element's data attribute
    const movieId = $(this).data('id');

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Hide other containers (if shown)
    $('.times-container').fadeOut('slow');
    $('.seats-container').fadeOut('slow');

    // Fetch screenings for selected movie
    $.ajax(`/api/movies/${movieId}/screenings`,
      {
        success: function (screenings) {
          // Reveal Dates container
          $('.dates-container').fadeIn('slow');

          // Save all screenings data for the movie into array
          screeningsData = screenings;
          console.log('screenings', screenings);
          // Get only array of dates
          const dates = screenings.map(screening => screening.date);
          // Remove duplicates, convert dates array into Set and back to array
          const uniqueDates = [...new Set(dates)];

          // Show/update dates list
          datesList.fadeOut(100, function() {
            // Clear the list and reveal the list
            $(this).html('').fadeIn("slow");

            // Insert each date into list
            if (uniqueDates.length === 0) {
              datesList.append(`<span class="list-group-item">No Dates available</span>`)
            } else {
              uniqueDates.forEach(function(date) {
                datesList.append(`<li class="list-group-item">${date}</li>`)
              });
            }
          });
        }
      }
    );
  });

  // == Date Pressed ===
  // Get screening times for selected date and display them in the list below
  datesList.on('click', 'li', function() {
    const clickedDate = $(this).text();

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Reveal times container
    $('.times-container').fadeIn('slow');

    // Hide seats container
    $('.seats-container').fadeOut(100);

    // clear time list and seats
    $(timesList).fadeOut(100, function () {
      // Clear the list
      timesList.html('');
      // Reveal the list
      timesList.fadeIn('slow');

      // Insert times for selected screening date
      screeningsData.forEach(function (screening) {
        if (screening.date === clickedDate) {
          timesList.append(`<li data-screeningid="${screening.id}" class="list-group-item">${screening.time}</li>`)
        }
      })
    })
  });

  // == Time Pressed ==
  // Get Theater and tickets and show available/reserved seats grid
  timesList.on('click', 'li', function() {

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Retrieve screening id from data- attribute of clicked html element
    const screeningId = $(this).data('screeningid');

    // Save selectedScreening
    selectedScreening = screeningsData.find(screening => screening.id === screeningId);

    // Reveal Seats container
    $('.seats-container').fadeIn('slow');
    // Show footer with booking summary
    $('.modal-footer').fadeIn('slow');

    //  Get all tickets for the screening(calculate reserved seats)
    $.ajax(`/api/tickets/screening/${screeningId}`, {
      success: function (tickets) {
        console.log('tickets', tickets);

        // Show/update seats list
        seats.fadeOut(100, function () {
          // Attach ticket price to seats grid
          seats.data('ticket-price', selectedScreening.price);

          // Clear the seats
          seats.html('');
          // Reveal the seats
          seats.fadeIn('slow');

          // Find theater attached to the screening from currently selected Screening
          let theater = selectedScreening.theater;
          console.log('theater', theater);

          // Prepare 2D array for seat grid
          const seatsArray = generateSeatsGrid(theater, tickets);
          // Fill modal with seats grid
          fillSeatsGrid(seatsArray);

        });
      } // end of success function
    });
  });

  // Add new booking
  // Trigger action only when submit button has .btn-success class
  $('.modal-footer').on('click', '#submitBtn.btn-success', function() {
    console.log('making a booking, yehhheee');
    // Convert array-like object into a JavaScript array: `https://api.jquery.com/jQuery.makeArray/`
    // then transform each element into object with `rowNo` and `columnNo` attributes that reflect Seat class
    const selectedSeats = $.makeArray($('.seat__selected')).map(seat => {
      return {
        rowNo: seat.dataset.row,
        columnNo: seat.dataset.column
      }
    });

    // Prevent making a booking without a phone number
    if (!$('#phoneNum').val()) {
      alert('Provide phone number');
      return
    }

    console.log('seats', selectedSeats);

    // Create representation of an booking object for sending to Backend
    let booking = {
      'customerPhoneNumber': $('#phoneNum').val(),
      'tickets': selectedSeats,
      'screening': selectedScreening
    };

    // Send post request to add new booking into Database
    $.ajax({
      type: 'POST',
      url:'/api/bookings',
      dataType: 'json',
      data: JSON.stringify(booking),
      contentType: 'application/json; charset=utf-8',
      success: function(bookingId){

        const row = `<tr class="row" data-bookingid=${bookingId}>
                        <td class="col-3">${booking.screening.movie.title}</td>
                        <td class="col-2">${booking.screening.date}</td>
                        <td class="col-1">${booking.screening.time.slice(0, -3)}</td>
                        <td class="col-3">${booking.customerPhoneNumber}</td>
                        <td class="col-1">
                            <button class="btn btn-info">
                                <span class="fas fa-ticket-alt"></span>
                            </button>
                        </td>
                        <td class="col-1">
                            <button class="btn btn-warning">
                                <span class="fas fa-edit"></span>
                            </button>
                        </td>
                        <td class="col-1">
                            <button class="btn btn-danger">
                                <span class="fas fa-trash"></span>
                            </button>
                        </td>
                    </tr>
        `;

        // Close modal
        $('#bookingModal').modal('hide');
        // Attach new row to the table
        $('#bookingsTable tbody').prepend(row);

      }
    })

  })
});