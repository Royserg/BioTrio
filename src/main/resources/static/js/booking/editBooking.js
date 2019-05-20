$(function() {



  $('table').on('click', '.btn-warning', function() {
    const bookingId = $(this).closest('tr').data('bookingid');


    $.ajax(`/api/bookings/${bookingId}`, {
      method: 'GET',
      success: function(data) {
        console.log(data);

        $('#screeningTitle').text(data.screening.movie.title);
        $('#screeningDate').text(data.screening.date);
        $('#screeningTime').text(data.screening.time);

        const theater = data.screening.theater;
        const tickets = data.tickets;
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

        tickets.forEach(function (ticket) {
          seatsArrangement[ticket.rowNo - 1][ticket.columnNo - 1] = false;
        });

        $('#seats').html('');

        $.each(seatsArrangement, function (rowIndex, row) {
          $('#seats').append(`<div id=row-${rowIndex} class="d-flex justify-content-center align-items-center"></div>`);

          // Iterate over each seat in a row (each holds true/false value)
          // Tooltips will show shifted rows and column info by 1, to reflect counting from 1
          $.each(row, function (columnIndex, seatFree) {
            $(`#row-${rowIndex}`)
              .append(`<span data-toggle="tooltip" title="row: ${rowIndex + 1} col: ${columnIndex + 1}" data-row="${rowIndex}" data-column="${columnIndex}" class="seat ${seatFree ? 'seat__free' : 'seat__reserved'} mx-2 my-2"></span>`)
          });
        });

      }
    })
  });


});
