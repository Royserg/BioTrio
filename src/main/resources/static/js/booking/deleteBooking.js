// Delete booking with confirmation popup
$('table').on('click', '.btn-danger', function() {
  const row = $(this).closest('tr');
  const bookingId = row.data('bookingid');

  // Get confirmation for deleting
  const remove = confirm(`Are you sure to remove booking: ${bookingId} and its tickets?`);
  if (remove) {
    $.ajax({
      url: `/api/bookings/${bookingId}`,
      method: 'DELETE',
      success: function(data) {
        console.log('back from backend', data);
        // Remove html table row with fading animation
        row.css('background', 'tomato');
        row.fadeOut(800, function() {
          $(this).remove();
        });
      }
    })
  }
});