$(function() {

  // Fetch tickets data for clicked booking
  // when tickets button clicked
  // tickets button have class ".btn-info"
  $('table').on('click', '.btn-info', function() {
    const bookingId = $(this).data('bookingid');

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

  // Delete booking with confirmation popup
  $('table').on('click', '.btn-danger', function() {
    const button = $(this);
    const bookingId = $(this).data('bookingid');

    // Get confirmation for deleting
    const remove = confirm(`Are you sure to remove booking: ${bookingId} and its tickets?`);
    if (remove) {
        $.ajax({
          url: `/api/bookings/${bookingId}`,
          method: 'DELETE',
          success: function(data) {
            // Remove html table row with fading animation
            button.closest('tr').css('background', 'tomato');
            button.closest('tr').fadeOut(800, function() {
              $(this).remove();
            })
          }
        })
    }

  });
});