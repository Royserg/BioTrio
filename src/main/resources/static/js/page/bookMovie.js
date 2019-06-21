$(function(){

  // Movie id read from url
  const movieId = window.location.pathname.split('/')[2];
  // Variable containing info about all screenings for a particular movie
  let allScreenings = [];

  // Fetch all screenings for selected movie
  $.ajax(`/api/movies/${movieId}/screenings`)
    .done(screenings => {

      // Keep all screenings in the global variable
      allScreenings = screenings;
      displayDates(screenings);



    });





  // Function filtering out all unique dates and displaying them in the select field
  function displayDates(screenings) {
    const dates = screenings.map(s => s.date);
    // Filter out unique dates
    const uniqueDates = [...new Set(dates)];

    uniqueDates.forEach(date => {
      $('#dateField').append(`<option value=${date}>${date}</option>`);
    });
  }


});