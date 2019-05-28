$(function() {
  // Has access to movies[] that were passed through the model
  console.log('movies', movies);

  // Holds selected objects information
  let selectedMovie;
  let selectedScreening;

  // References to particular html list <ul>
  const moviesList = $('#moviesList');
  const timesList = $('#screeningTimes');
  const datesList = $('#screeningDates');
  // Reference to the <div> container for seats
  const seats = $('#seatsGrid');


  // Show modal for adding a new booking,
  // displaying only list of movies
  $('#addBookingBtn').click(function () {
    // Change Submit Button name and classes
    $('#submitBtn')
      .text('Book tickets')
      .removeClass('btn-warning')
      .addClass('btn-success');

    // Reset list of movies
    moviesList.html('');
    // Hide containers for booking info, so opening modal again doesn't show previous booking's data
    fadeOutBulk([
        $('.dates-container'),
        $('.times-container'),
        $('.seats-container'),
        $('.modal-footer')
    ]);
    // Reset fields
    $('#price').text(0);
    $('#ticketsCount').text(0);
    $('#phoneNum').val('');

    // Loop over movies from the global variable and display each as <li>
    movies.forEach(function(movie) {
      const $li = $(`<li class="list-group-item" data-id=${movie.id}>${movie.title}</li>`);
      $('#moviesList').append($li);
    });
    // Open modal
    $('#bookingModal').modal();
  });


  // == Movie Clicked ==
  // Display list of dates and save selected movie data into a variable
  moviesList.on('click', 'li', function() {
    // Read movie id from clicked element's data attribute
    const movieId = $(this).data('id');

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Hide other containers (if shown)
    fadeOutBulk([$('.times-container'), $('.seats-container')]);

    // Reveal Dates container
    $('.dates-container').fadeIn('slow');

    // Hold currently selected movie in a variable
    selectedMovie = movies.find(movie => movie.id === movieId);
    // Transform array of objects (Screening) into array of dates strings
    const dates = selectedMovie.screenings.map(screening => screening.date);
    // Remove duplicates from the array, convert dates array into Set and back
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
  }); // == End Movie Clicked ==

  // == Date Clicked ==
  // Show Possible screening times for selected date
  datesList.on('click', 'li', function() {
    const selectedDate = $(this).text();

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Hide seats container
    fadeOutBulk([$('.seats-container')]);

    // Reveal times container
    $('.times-container').fadeIn('slow');

    // clear time list and seats
    $(timesList).fadeOut(100, function () {
      // Clear the list and reveal it
      timesList.html('').fadeIn('slow');

      // Insert times for selected screening date
      selectedMovie.screenings.forEach(function (screening) {
        if (screening.date === selectedDate) {
          timesList.append(`<li data-screeningid="${screening.id}" class="list-group-item">${screening.time}</li>`)
        }
      })
    })
  }); // == End Date Clicked ==

  // == Time Clicked ==
  // Get theater for selected screening and display seats grid
  timesList.on('click', 'li', function() {
    // Retrieve screening id from data- attribute of clicked html element
    const screeningId = $(this).data('screeningid');

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Save selected screening
    selectedScreening = selectedMovie.screenings.find(screening => screening.id === screeningId);
    console.log('screening: ', selectedScreening);

    // Show Seats container
    $('.seats-container').fadeIn('slow');
    // Show footer with booking summary
    $('.modal-footer').fadeIn('slow');

    // Get Theater for selected screening
    $.ajax(`/api/theaters/${selectedScreening.theaterId}`)
      .done(theater => displaySeatsGrid(theater));
  });

  // Handle theater information send form backend
  // and Display seats in a grid
  function displaySeatsGrid(theater) {
    // Show/update seats list
    seats.fadeOut(100, function () {
      // Attach ticket price to seats grid
      seats.data('ticket-price', selectedScreening.price);

      // Clear the seats and reveal them
      seats.html('').fadeIn('slow');

      // Create tickets array from selectedScreening bookings list
      // Screening has list of bookings, each have list of tickets
      // map function in this case returns an array of tickets for each booking
      // So end result is a nested array like: [[booking 1 Tickets], [booking 2 Tickets]]
      // flat() function removes nested arrays and creates one big array of tickets
      const tickets = selectedScreening.bookings.map(booking => booking.tickets).flat();
      console.log('tickets', tickets);
      // Prepare 2D array for seat grid
      const seatsArray = generateSeatsGrid(theater, tickets);
      // Fill modal with seats grid
      fillSeatsGrid(seatsArray);

    });
  }


  // == Add new booking ==
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
      'screeningId': selectedScreening.id
    };

    // Send post request to add new booking into Database
    $.ajax({
      type: 'POST',
      url:'/api/bookings',
      dataType: 'json',
      data: JSON.stringify(booking),
      contentType: 'application/json; charset=utf-8',
    })
      .done(function(bookingId){

        const $row = createBookingRow(bookingId, booking.customerPhoneNumber, selectedMovie.title, selectedScreening);
        // Save booking into state
        movies
          .find(movie => movie.id === selectedMovie.id)
          .screenings.find(screening => screening.id === selectedScreening.id)
          .bookings.push(booking);

        // Close modal
        $('#bookingModal').modal('hide');
        // Attach new row to the table
        $('#bookingsTable tbody').prepend($row);

      })

  })


});