
$(function() {
  $('#movieList').on('click', 'a', function() {
    const movieId = $(this).data('id');
    const screeningList = $('#screeningList');
    // once movie clicked - clear screenings
    screeningList.html('');

    // get Screenings from backend
    fetch(`/api/screenings/${movieId}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        // That's how the example shows https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const data = JSON.stringify(myJson);

        JSON.parse(data).

        $.each(JSON.parse(data), function(index, screening) {
          screeningList.append(`<a href="#" class="list-group-item list-group-item-action">${screening.date}</a>`)
        })

      })
    .catch(e => console.log("Error: " + e));
  })
});





