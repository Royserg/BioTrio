$(function(){

  const API_KEY = '02325bf00c28d42c083b25b3be60b75e';
  const API_URL = 'https://api.themoviedb.org/3';
  const API_IMAGE_URL = 'https://image.tmdb.org/t/p/w342';

  const $datepicker = $('#datepicker');

  // Reference to the main poster of the page
  const $todayMoviesContainer = $('.movies--container .row');

  // Initialize Datepicker with options, and set current date into the field
  $datepicker.datepicker(
        {
            minDate: 0,
            maxDate: "+1M",
            dateFormat: "yy-mm-dd",
            onSelect: handleDateSelect
        }
         ).datepicker('setDate', new Date());

  // Get current date in 2019-06-17 format
  const currentDate = $.datepicker.formatDate('yy-mm-dd', new Date());

  // Get screenings for current date
  getScreeningsForDate(currentDate)
    .done(fetchMovieInfoAndUpdatePage);




  // === Functions ===
  /**
   * Datepicker Select date handler
   * @param dateText
   * @param instance
   */
  function handleDateSelect(dateText, instance) {

    getScreeningsForDate(dateText)
      .done(fetchMovieInfoAndUpdatePage);
  }

  /**
   * Get all screenings for a provided date
   * @param date (date String) - ex. 2019-06-16
   */
  function getScreeningsForDate(date) {
      return $.ajax(`/api/screenings/date/${date}`);
  }

  /**
   * Function fetching information about each movie from API
   * and displays images of the movies in the movie--section
   * Shows spinner when the function is triggered
   * @param screenings list of screenings to display in the movie section
   */
  function fetchMovieInfoAndUpdatePage(screenings) {
    // Remove all children
    $todayMoviesContainer.html('');

    // Show spinner before screenings are fetched
    $todayMoviesContainer.append(`<div class="spinner--container col-12 d-flex justify-content-center align-items-center">
                                    <div class="spinner-border text-dark" role="status">
                                        <span class="sr-only">Loading</span>
                                    </div>
                                </div>`);


    if(screenings.length > 0) {
      // Merge screenings for the same movie into one

      const todayMovies = [];

      // Transform time property into an array
      screenings
        .map(screening => { return { ...screening, times: [{ id: screening.id, time: screening.time }] } })
        .forEach(screening => {

        const existingMovie = todayMovies.find(s => s.movieId === screening.movieId);

        // Add screening time to already existing Movie in the list
        if (existingMovie) {
          existingMovie.times.push(screening.times[0]);
        } else {
          // Place movie in the array if it is not there
          todayMovies.push(screening);
        }
      });

      // Fetch info from API about each movie
      todayMovies.forEach((movie) => {

        $.ajax(`${API_URL}/movie/${movie.movieId}?api_key=${API_KEY}&language=en-US`)
          .done(movieInfo => {

            const $todayMovie = $(`<div class="col-md-3 movie--container">
                                      <div class="card" >
                                          <img class="card-img-top" src="${API_IMAGE_URL + movieInfo['poster_path']}" alt="${movieInfo['title']} poster">
                                          <div class="card-body">
                                              <h5 class="card-text mb-4">${movieInfo['original_title']}</h5>
                                              <p>times:</p>
                                              <ul class="list-group times--list">
                                                  ${movie['times'].map(screening => `<a href="/page/${screening.id}" class="list-group-item list-group-item-action">${screening.time.slice(0, -3)}</a>`).join('')}
                                              </ul>
                                          </div>
                                      </div>
                                   </div>`);

            // Append Movie poster to hero section
            $todayMoviesContainer.append($todayMovie);

            // Remove spinner if it exists
            $todayMoviesContainer.find('.spinner--container').remove();
          });
      });


    } else {
      // Remove spinner if it exists
      $todayMoviesContainer.find('.spinner--container').remove();

      $todayMoviesContainer.append(`<div class="col-12"><h3>No Screenings available</h3></div>`);
    }
  }


});