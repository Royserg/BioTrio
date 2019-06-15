$(function() {

    console.log('movie js loaded');

    // TheMovieDB API setup
    const API_KEY = '02325bf00c28d42c083b25b3be60b75e';
    const API_URL = 'https://api.themoviedb.org/3';


    // Initialize modal class
    const movieModal = new Modal($('#movieModal'), $('#submitModal'));

    const addButton = $('#addButton');

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
            $('#modalTitle').val("");
            $('.dropdown-search').empty();
            $('#selectedTitle').html("");

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

    //search movie on the tmdb api
    $('#dropdownSearchButton').off('click').on('click', function(e){

        e.stopPropagation();
        e.preventDefault();

        $(this).next('select').show();
        // get the input of movie to search
        let movieTitle = $('#modalTitle').val();

        // search by the title of the movie on tmdb api and show the lists of movies that include the title
        $.ajax(`${API_URL}/search/movie?api_key=${API_KEY}&query=${movieTitle}`)
            .done(response => {

                response.results.forEach((r) => {

                    let searchRow = `<option class="dropdown-item searchResult" href="#" data-id="${r['id']}" data-title="${r['original_title']}">'${r['original_title']}' released on ${r['release_date']}</option>`
                    $('.dropdown-search').append(searchRow);

                })

            });

    });

    // when select movie -> show it on the result span
    $('.show-search').on('click', '.searchResult', function(e) {

        e.stopPropagation();
        e.preventDefault();

        // show the selected movie on the result span and close the options
        let row = $(this).closest('option');
        $('#selectedTitle').html(row[0].innerHTML);
        $('.searchResult').hide();

        // save the relevant data as attributes so that it can be passed onto the object initialization
        id = row.data('id');
        movieTitle = row.data('title');

    });


});
