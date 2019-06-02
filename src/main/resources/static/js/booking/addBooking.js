$(function(){
  // Keep fetched list of movies
  let moviesData = [];
  // Keep fetched data about screenings for chosen movie
  let screeningsData = [];
  // Holds selected screening and movie object
  let selectedScreening;
  let selectedMovie;

  // References to particular html list <ul>
  const moviesList = $('#moviesList');
  const timesList = $('#screeningTimes');
  const datesList = $('#screeningDates');
  // Reference to the <div> container for seats
  const seats = $('#seatsGrid');


  // Show modal for adding a new booking, with loaded list of movies
  $('#addBookingBtn').click(function() {
    // Change Submit Button name and classes
    $('#submitBtn')
      .text('Book tickets')
      .removeClass('btn-warning')
      .addClass('btn-primary');

    // Reset list of movies
    moviesList.html('');
    // Hide containers for booking info, so opening modal again doesn't show previous booking info
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

    // Fetch list of movies and append to the list
    $.ajax('/api/movies')
      .done(movies => {
            // Save movies into array
            moviesData = movies;
            // Loop over each movie and display list items with movie info
            movies.forEach(movie => {
              const $li = $(`<li class="list-group-item" data-id=${movie.id}>${movie.title}</li>`);
              $('#moviesList').append($li);
            });
        });

    // Open modal
    $('#bookingModal').modal();
  });


  // == Movie Clicked ==
  // Fetch screenings for selected movie and show list of dates
  moviesList.on('click', 'li', function() {
    // Read movie id from clicked element's data attribute
    const movieId = $(this).data('id');
    // Save selected movie into variable
    selectedMovie = moviesData.find(movie => movie.id === movieId);

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Hide other containers (if shown)
    fadeOutBulk([$('.times-container'), $('.seats-container'), $('.modal-footer')]);

    // Fetch screenings for selected movie
    $.ajax(`/api/movies/${movieId}/screenings`)
      .done(screenings => displayScreenings(screenings));

  });

  // Save screenings data and display selected screening dates
  function displayScreenings(screenings) {
    // Reveal Dates container
    $('.dates-container').fadeIn('slow');

    // Save all screenings data for the movie into array
    screeningsData = screenings;
    // Transform array of screenings objects into array of screening dates
    const dates = screenings.map(screening => screening.date);
    // Remove duplicates, convert dates array into Set and back to array
    const uniqueDates = [...new Set(dates)].sort();

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
  } // == End Movie Clicked ==


  // == Date Clicked ===
  // Get screening times for selected date and display them in the list below
  datesList.on('click', 'li', function() {
    const clickedDate = $(this).text();

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Hide seats container
    fadeOutBulk([$('.seats-container'), $('.modal-footer')]);

    // Reveal times container
    $('.times-container').fadeIn('slow');

    // clear time list and seats
    $(timesList).fadeOut(100, function () {
      // Clear the list
      timesList.html('');
      // Reveal the list
      timesList.fadeIn('slow');

      // Insert times for selected screening date
      screeningsData.forEach(function (screening) {
        if (screening.date === clickedDate) {
          timesList.append(`<li data-screeningid="${screening.id}" class="list-group-item">${screening.time.slice(0,-3)}</li>`)
        }
      })
    })
  }); // == End Date Clicked ==

  // == Time Clicked ==
  // Get Theater and tickets and show available/reserved seats grid
  timesList.on('click', 'li', function() {
    // Retrieve screening id from data- attribute of clicked html element
    const screeningId = $(this).data('screeningid');

    // Toggle selected class to the element
    toggleListItemSelectedClass($(this));

    // Save selectedScreening
    selectedScreening = screeningsData.find(screening => screening.id === screeningId);

    // Show Seats container
    $('.seats-container').fadeIn('slow');
    // Show footer with booking summary
    $('.modal-footer').fadeIn('slow');
    // Reset ticket count and total price
    $('#ticketsCount').text(0);
    $('#price').text(0);

    //  Get all tickets for the screening to calculate grid and show reserved seats
    // $.ajax(`/api/tickets/screening/${screeningId}`)
    $.ajax(`/api/screenings/${screeningId}/tickets`)
      .done(tickets => displaySeatsGrid(tickets));

  });

  function displaySeatsGrid (tickets) {
    console.log('tickets', tickets);

    // Show/update seats list
    seats.fadeOut(100, function () {
      // Attach ticket price to seats grid
      seats.data('ticket-price', selectedScreening.price);

      // Clear the seats and reveal them
      seats.html('').fadeIn('slow');

      // Find theater attached to the screening from currently selected Screening
      let theater = selectedScreening.theater;
      console.log('theater', theater);

      // Prepare 2D array for seat grid
      const seatsArray = generateSeatsGrid(theater, tickets);
      // Fill modal with seats grid
      fillSeatsGrid(seatsArray);
    });
  } // == Time Clicked End ==


  // Add new booking
  // Trigger action only when submit button has .btn-success class
  $('.modal-footer').on('click', '#submitBtn.btn-success', function() {
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

    // Create representation of an booking object for sending to Backend
    let booking = {
      'customerPhoneNumber': $('#phoneNum').val(),
      'tickets': selectedSeats,
      'movie': selectedMovie,
      'screening': selectedScreening
    };

    // Send post request to add new booking into Database
    $.ajax({
      type: 'POST',
      url:'/api/bookings',
      dataType: 'json',
      data: JSON.stringify(booking),
      contentType: 'application/json; charset=utf-8'
    })
      .done(bookingId => addBookingRow(bookingId, booking));

  })


  function addBookingRow(bookingId, booking) {
    const $row = createBookingRow(bookingId, booking);
    // Close modal
    $('#bookingModal').modal('hide');
    // Attach new row to the table
    $('#bookingsTable tbody').prepend($row);
  }
});