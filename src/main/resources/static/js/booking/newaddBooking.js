$(function() {
  console.log('movies', movies);

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
  $('#addBookingBtn').click(function () {
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
      success: function (movies) {
        console.log(movies);
        movies.forEach(movie => {
          $('#moviesList').append(`<li class="list-group-item" data-id=${movie.id}>${movie.title}</li>`);
        });
      }
    });
    // Open modal
    $('#bookingModal').modal();
  });

});