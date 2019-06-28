/**
 * Remove `selected` class from siblings of clicked element and
 * toggle `selected` class on clicked element
 * @param element (clicked <li> element)
 */
function toggleListItemSelectedClass(element) {
  // Remove selected class from all items
  element.siblings('li').removeClass('list-group-item__selected');
  // Add selected class to the clicked item
  element.addClass('list-group-item__selected');
}


/**
 * Create 2D boolean array of seats from theater data,
 * set all seats to `true`, then loop through all tickets for viewed screening
 * and set their seats to `false` (reserved)
 * @param theater (Theater) Theater object
 * @param screeningTickets (Ticket[]) array of Ticket objects
 * @returns {boolean[][]} 2D array of booleans
 */
function generateSeatsGrid(theater, screeningTickets) {

  // === Prepare seats ====
  // Extract rows and columns from theater object
  const rows = theater['rowsNumber'];
  const columns = theater['columnsNumber'];

  // === Create 2 dimensions array for seats grid ===
  // Create array of rows length
  const seatsArray = new Array(rows);

  // Each element of the array should be an array of columns length -> 2D
  for (let i = 0; i < rows; i++) {
    seatsArray[i] = new Array(columns);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // set all seats to be available a.k.a true
      seatsArray[i][j] = true;
    }
  }
  // === Creating 2 dimensions array - end

  // Loop over all tickets for selected screening and set seats to false
  screeningTickets.forEach(function (ticket) {
    seatsArray[ticket.rowNo - 1][ticket.columnNo - 1] = false;
  });

  return seatsArray;
}

/**
 * Given 2D array of booleans, create html rows (divs) containing seats (spans)
 * and attach them to html element with id `seatsGrid`
 * @param seatsArray (boolean[][])
 */
function fillSeatsGrid(seatsArray) {
  const seatsGrid = $('#seatsGrid');

  // Clear seats grid
  seatsGrid.html('');
  // For each row (length of seatsArray) create a div (container) to which seats are appended
  // div -> [ false, false, true, false ]
  // div -> [ false,  true, true, true  ]
  for (let i = 0; i < seatsArray.length; i++) {
    let $row = $('<div>', {'class': 'd-flex justify-content-center align-items-center'});

    for (let j = 0; j < seatsArray[i].length; j++) {
      // Save boolean from array into a variable
      let isFree = seatsArray[i][j];
      // Prepare seat element, add 1 to row and col, so they start counting from 1
      let $seat = $('<span>', {
        'class': `seat mx-1 my-1 ${isFree ? 'seat__free' : 'seat__reserved'}`,
        'title': `row: ${i + 1} col: ${j + 1}`,
        'data-row': i + 1,
        'data-column': j + 1,
        'data-toggle': 'tooltip'
      });

      // Attach seat to the row
      $row.append($seat);
    }

    // Attach row to the seats grid
    seatsGrid.append($row);
  }


  // Initialize seats tooltips (row and column information box above each seat after hover)
  $('[data-toggle="tooltip"]').tooltip();
}


/**
 * == SEAT Clicked event listener ==
 * Select and unselect seats adds/removes `seat__selected` class
 * Updates tickets count and total price
 */
$('#seatsGrid').on('click', '.seat__free', function() {

  const ticketPrice = $('#seatsGrid').data('ticket-price');

  if($('.seat__selected').length < 4) {

    $(this).toggleClass('seat__selected');

  } else if($(this).hasClass('seat__selected')) {
    $(this).toggleClass('seat__selected');
  } else {
    alert("Max 4 seats available");
  }

  // Update tickets count and price
  $('#ticketsCount').text($('.seat__selected').length);
  $('#price').text(`${$('.seat__selected').length * ticketPrice} dkk`);
});

/**
 * Function will fadeOut all provided jQuery objects in the array
 * @param elementsArray (jQuery[])
 */
function fadeOutBulk(elements) {

  for (let i = 0; i < elements.length; i++) {
      elements[i].fadeOut(100);
  }
}


/**
 * Create table row with booking information
 * @param bookingId (int) id of a booking
 * @param phoneNumber (String) phone number of the customer making a booking
 * @param title (String) movie title
 * @param screening (Screening) object
 * @returns {*|jQuery.fn.init|jQuery|HTMLElement}
 */
function createBookingRow(bookingId, booking) {
  const { screening, movie } = booking;

  const $row = $(`<tr class="d-flex" data-bookingid=${bookingId}>
                        <td class="col-3">${movie.title}</td>
                        <td class="col-2">${screening.date}</td>
                        <td class="col-1">${screening.time.slice(0, -3)}</td>
                        <td class="col-3">${booking.customerPhoneNumber}</td>
                        <td class="col-1">
                            <button class="btn btn-outline-dark btn-tickets" title="tickets">
                                <span class="fas fa-ticket-alt"></span>
                            </button>
                        </td>
                        <td class="col-1">
                            <button class="btn btn-outline-dark btn-edit" title="edit">
                                <span class="fas fa-edit"></span>
                            </button>
                        </td>
                        <td class="col-1">
                            <button class="btn btn-outline-dark btn-delete" title="delete">
                                <span class="fas fa-trash"></span>
                            </button>
                        </td>
                    </tr>
               `);
  return $row;
}

// Initialize booking Modal
const bookingModal = new Modal($('#bookingModal'), $('#submitBtn'));