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



      }
    })
  });


});
