
$(function() {
  // Store Screenings data for chosen movie
  let screeningsData = [];

  // References to particular html list <ul>
  const moviesList = $('#moviesList');
  const timesList = $('#screeningTimes');
  const datesList = $('#screeningDates');

  const seats = $('#seats'); // Reference to the <div> container for seats
  let screeningId;           // Holds screeningId after screening time is pressed
  let ticketPrice;           // Holds a ticket price of a chosen screening

  // == Util Function ==
  // Remove selection class from siblings and add
  // selected class to clicked element
  function toggleListItemSelectedClass(element) {
    // Remove selected class from all items
    element.siblings('li').removeClass('list-group-item__selected');
    // Add selected class to the clicked item
    element.toggleClass('list-group-item__selected');
  }


  // == Movie Clicked ==
  // Fetch screenings for chosen movie
  moviesList.on('click', 'li', function() {
    // Read movie id from clicked element's data attribute
    const movieId = $(this).data('id');

    // Add selected class
    toggleListItemSelectedClass($(this));

    // hide other containers (if shown)
    $('.times-container').fadeOut('slow');
    $('.seats-container').fadeOut('slow');

    // Fetch screenings for selected movie
    $.ajax(`/api/screenings/${movieId}`,
      {
        success: function (screenings) {
          // Reveal Dates container
          $('.dates-container').fadeIn('slow');

          // Save all screenings data for the movie into array
          screeningsData = screenings;

          // Get only array of dates
          const dates = screenings.map(screening => screening.date);
          // Remove duplicates, convert dates array into Set and back to array
          const uniqueDates = [...new Set(dates)];

          // Show/update dates list
          $(datesList).fadeOut(100, function() {
            // Clear the list
            datesList.html('');
            // Reveal the list
            datesList.fadeIn("slow");

            // Insert each date into list
            if (uniqueDates.length === 0) {
              datesList.append(`<span class="list-group-item">No Dates available</span>`)
            } else {
              $.each(uniqueDates, function(index, date) {
                datesList.append(`<li class="list-group-item">${date}</li>`)
              })
            }
          });

        }
      });
    }
  );


  // == Date Clicked ==
  // Display Screening times for selected date option
  datesList.on('click', 'li', function() {
    const clickedDate = $(this).text();
    // Add selected class
    toggleListItemSelectedClass($(this));

    // Reveal times container
    $('.times-container').fadeIn('slow');

    // Hide seats container
    $('.seats-container').fadeOut(100);

    // clear time list and seats
    $(timesList).fadeOut(100, function() {
      // Clear the list
      timesList.html('');
      // Reveal the list
      timesList.fadeIn('slow');

      // Insert times for selected screening date
      $.each(screeningsData, function(index, screening) {
        if(screening.date === clickedDate){
          timesList.append(`<li data-screening-id="${screening.id}" class="list-group-item">${screening.time}</li>`)
        }
      })
    });
  });



  // == TIME Clicked ==
  // OnClick event for a screening Time
  timesList.on('click', 'li', function() {

    // Add selected class
    toggleListItemSelectedClass($(this));

    // Retrieve screening id from data- attribute of clicked html element
    screeningId = $(this).data('screening-id');
    // Save selected screening price, find screening and access price attribute
    ticketPrice = screeningsData.find(screening => screening.id === screeningId)['price'];

      // Reveal Seats container
    $('.seats-container').fadeIn('slow');

    //  Get all tickets for the screening(calculate reserved seats)
    $.ajax(`/api/tickets/screening/${screeningId}`, {
      success: function (tickets) {
        console.log('tickets', tickets);

        // Show/update seats list
        seats.fadeOut(100, function () {
          // Clear the seats
          seats.html('');
          // Reveal the seats
          seats.fadeIn('slow');

          // Find theater attached to the screening from screeningData already fetched
          let theater = screeningsData.find(screening => screening.id === screeningId)['theater'];
          console.log('theater', theater);

          const rows = theater['rowsNumber'];
          const columns = theater['columnsNumber'];

          // === Create 2 dimensions array for seats grid ===
          const seatsArrangement = new Array(rows);
          for (let i = 0; i < rows; i++) {
            seatsArrangement[i] = new Array(columns);
          }

          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              // set all seats to be available a.k.a true
              seatsArrangement[i][j] = true;
            }
          }
          // === Creating 2 dimensions array - end

          // Set taken seats (false)
          // rows and columns count starts from 1 but arrays start counting from 0, so both need to be reduced
          // first Seat { row: 1, column: 1 } in array will be at seatsArrangements[0][0] -> (row: 0, column: 0)
          tickets.forEach(function (ticket) {
            seatsArrangement[ticket.rowNo - 1][ticket.columnNo - 1] = false;
          });

          $.each(seatsArrangement, function (rowIndex, row) {
            seats.append(`<div id=row-${rowIndex} class="d-flex justify-content-center align-items-center"></div>`);

            // Iterate over each seat in a row (each holds true/false value)
            // Tooltips will show shifted rows and column info by 1, to reflect counting from 1
            $.each(row, function (columnIndex, seatFree) {
              $(`#row-${rowIndex}`)
                .append(`<span data-toggle="tooltip" title="row: ${rowIndex + 1} col: ${columnIndex + 1}" data-row="${rowIndex}" data-column="${columnIndex}" class="seat ${seatFree ? 'seat__free' : 'seat__reserved'} mx-2 my-2"></span>`)
            })
          })

          // Initialize seats tooltips (row and column information box above each seat after hover)
          $('[data-toggle="tooltip"]').tooltip();

        }) // end of fadeOut callback


      } // end of success function
    });
  });


  // == SEAT Clicked ==
  // Select and unselect seats.
  seats.on('click', '.seat__free', function(){

    if($('.seat__selected').length < 4) {

      $(this).toggleClass('seat__selected');

    } else if($(this).hasClass('seat__selected')) {
      $(this).toggleClass('seat__selected');
    } else {
      alert("Max 4 seats available");
    }

    const seatCount = $('.seat__selected').length;
      // Update tickets count
    $('#ticketsCount').text(seatCount);
    // Update total price
    $('#price').text(`${seatCount * ticketPrice} dkk`);

  });

    $('#bookButton').click(function() {

      // Convert array-like object into a JavaScript array: `https://api.jquery.com/jQuery.makeArray/`
      // then transform each element into object with `rowNo` and `columnNo` attributes that reflect Seat class
      const selectedSeats = $.makeArray($('.seat__selected')).map(seat => {
        return {
          rowNo: seat.dataset.row,
          columnNo: seat.dataset.column
        }
      });

      console.log('seats', selectedSeats);

      // Create representation of an booking object for sending to Backend
      let booking = {
        'customerPhoneNumber': $('#phoneNum').val(),
        'tickets': selectedSeats,
        'screening': screeningsData.find(screening => screening.id === screeningId)
      };

      // Send post request to save the booking into Database
      $.ajax({
        type: 'POST',
        url:'/api/bookings/add',
        dataType: 'json',
        data: JSON.stringify(booking),
        contentType: 'application/json; charset=utf-8',
        success: function(data){

          // Redirect to /bookings once request is successful = booking is saved
          $(location).attr('href','/bookings');
        }
      })

    })
});











