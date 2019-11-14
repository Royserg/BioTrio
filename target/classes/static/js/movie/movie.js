$(function() {

    console.log('movie js loaded');

    // TheMovieDB API setup
    const API_KEY = '02325bf00c28d42c083b25b3be60b75e';
    const API_URL = 'https://api.themoviedb.org/3';
    const API_IMAGE_URL = 'https://image.tmdb.org/t/p/w92/';


    // Initialize modal class
    const movieModal = new Modal($('#movieModal'), $('#submitModal'));

    const addButton = $('#addButton');

    let i;
    let id;
    let isEdit = false;
    let movieTitle;
    // let row;

    //add class to the add button
    addButton.addClass("add-movie");

    // Click add movie and it'll clear the modal, getting ready for new info
    //https://stackoverflow.com/a/28108858
    $(document).on("click", '#addButton.add-movie', function() {

            // Change isEdit into false
            isEdit = false;

            // Clear the modal
            $('#searchMovie').val("");
            $('.dropdown-menu').empty();
            $('#showResults').empty();

            // Show the modal for adding a new Movie
            movieModal.showModal(isEdit, 'Add Movie', 'Add Movie');
        });

        // Click save button and add accordingly
        $('html body').off('click').on('click', '#submitModal', function (e) {

                add(e);

        });

        // Add a movie
        function add(e) {
            // Disable submit button
            movieModal.disableButton();

            // Prevent default event such as refreshing the whole page after the movie is added
            e.preventDefault();

            let newMovie = {
                'id': id,
                'title': movieTitle
            };

            $.ajax({
                type: 'POST',
                url: `/api/movies`,
                dataType: 'json',
                data: JSON.stringify(newMovie),
                contentType: 'application/json'
            })
            .done(function (id) {

                    // Add new row to the table with the newly added movie
                    let newRow = `<tr class="d-flex" data-movieid="${id}", data-movietitle="${newMovie.title}">
                                    <td class="col-1 cool-pointer">
                                        <button title="screening list" class="btn btn-outline-dark">
                                            <span class="fas fa-chevron-right"></span>
                                        </button>
                                    </td>
                                    <td class="col-3 id">${newMovie.id}</td>
                                    <td class="col-7 title cool-pointer">${newMovie.title}</td>
                                <td class="col-1">
                                    <button class="btn btn-outline-dark btn-delete" title="delete">
                                        <span class="fas fa-trash"></span>
                                    </button>
                                </td>
                              </tr>`;

                    // Add new row to the table and hide the modal
                    $('#movieTable tbody').append(newRow);
                    setTimeout(function () {
                        $('#movieModal').modal('hide');
                    }, 100);

                    // Scroll down the table so that you can see the newly added movie
                     $('#movieTable tbody').scrollTop($('#movieTable tbody')[0].scrollHeight);
                });

        }


        // search movie on the tmdb api
        $('.modal-body').on('keyup', '#searchMovie', function() {
            // clear the drop down and the result panel
            $('.dropdown-item').remove();
            $('.dropdown-menu').empty();
            $('#showResults').empty();

            // get the input value
            let searchTitle = $('#searchMovie').val();

            // search the title through the tmdb api and show the first 3(the most recently released) results
            $.ajax(`${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTitle}`)
                    .done(response => {
                        for(i=0; i<3; i++){
                            let result = response.results[i];
                            let resultRow = `<a class="dropdown-item" href="#" data-id="${result['id']}" data-title="${result['original_title']}" style="display:flex; justify-content:flex-start;">
                                                <img class="movieThumbnail"  src="${API_IMAGE_URL + result['poster_path']}"/>
                                                <div style="margin-left: 30px;"><p>${result['original_title']}</p>
                                                     <p>${result['release_date']}</p></div></a>`;
                            $('.dropdown-menu').append(resultRow);

                        }


                    });

        });

        // when select movie -> show the title on the result panel
        $('.dropdown-menu').on('click', '.dropdown-item', function() {

            // empty the result panel
            $('#showResults').empty();

            // save the id and title for adding the movie
            id = $(this).data('id');
            movieTitle = $(this).data('title');

            // get the info of the selected movie from tmdb and show it on result panel
            $.ajax(`${API_URL}/movie/${id}?api_key=${API_KEY}`)
                .done(response => {
                    let selectedMovieRow =`<br>
                                    <label for="selectedMovie">Movie selected</label>
                                    <div type="text" id="selectedMovie" maxlength="255" style="display:flex; justify-content:space-around;">
                                    <img class="selectedMovieThumbnail"  src="${API_IMAGE_URL + response['poster_path']}"/>
                                    <div><p> Title: ${response['original_title']}</p>
                                        <p> Release Date: ${response['release_date']}</p>
                                        <p> Status: ${response['status']}</p>
                                        <p> Runtime: ${response['runtime']}</p></div>
                                    </div>`;

                    $('#showResults').append(selectedMovieRow);

                });
        })

});
