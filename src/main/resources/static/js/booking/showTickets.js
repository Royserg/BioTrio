$(function() {

  // Fetch tickets data for clicked booking
  // when tickets button clicked
  // tickets button have class ".btn-info"
  $('table').on('click', '.btn-info', function() {
    const row = $(this).closest('tr');
    const bookingId = row.data('bookingid');

    // Clear tickets list
    $('.modal-tickets').html('');

    // Get array of tickets for selected booking
    $.ajax(`/api/tickets/${bookingId}`, {
      success: function(data) {
        // Iterate over list of tickets
        // and display tickets in modal body
        $.each(data, (index, ticket) => {
          // create list item for each ticket
          const $li = $('<li>', {'class': 'list-group-item list-group-item-action'});
          $li.text(`row: ${ticket.rowNo} column: ${ticket.columnNo}`)

          $('.modal-tickets').append($li);
        })

      }
    });

    // Set modal Title
    $('.modal-title').text(`booking: ${bookingId}`);

    // Open modal
    $('#ticketsModal').modal('show');
  })

});