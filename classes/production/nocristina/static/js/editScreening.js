$(function() {

    const editMovie = $('#editMovie');
    const editTheater = $('#editTheater');
    const editPrice = $('#editPrice');
    const editDate = $('#editDate');
    const editTime = $('#editTime');
    const submitButton = $('#submitButton');

    let movieId;
    let theaterId;
    let screeningId;

    let selectedScreening;
    let editedTheater;
    let editedMovie;

    let button;

    $('td a').click(function(){

        screeningId = $(this).attr('data-screeningid');
        button = $(this);

        $.ajax(`/screenings/find/${screeningId}`,   // request url
            {
                success: function (data) {// success callback function

                    selectedScreening = data;

                    //populates the modal with data about the selected screening
                    editMovie.val(selectedScreening.movie.title);
                    editTheater.val(selectedScreening.theater.name);
                    editDate.val(selectedScreening.date);
                    editTime.val(selectedScreening.time);
                    editPrice.val(selectedScreening.price);

                    editedMovie = selectedScreening.movie;
                    editedTheater = selectedScreening.theater;
                }
            });
    });

    editMovie.change(function() {

        // https://stackoverflow.com/a/2888447
        movieId = $(this).children(":selected").data('movie_id');

        // gets the selected movie
        $.ajax(`/api/movie/${movieId}`,   // request url
            {
                success: function (data) {// success callback function

                    editedMovie = data;
                }
            });
    });

    editTheater.change(function() {

        // https://stackoverflow.com/a/2888447
        theaterId = $(this).children(":selected").data('theater_id');

        $.ajax(`/api/theater/${theaterId}`,   // request url
            {
                success: function (data) {// success callback function

                    editedTheater = data;
                }
            });
    });

    submitButton.click(function() {
        selectedScreening = {
            "id":screeningId,
            "movie": editedMovie,
            "theater": editedTheater,
            "price": editPrice.val(),
            "date": editDate.val(),
            "time": editTime.val()
        }

        $.ajax({

            type: 'POST',
            url: `/screenings/edit/${screeningId}`,
            dataType: 'json',
            data: JSON.stringify(selectedScreening),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {

                // Fancy css and close the modal
                button.closest('tr').css('background', 'gold');
                button.closest('tr').fadeOut(300, function() {
                    $(this).fadeIn(300);
                    $(this).css('background', 'white');
                    setTimeout(function(){ $('#editScreening').modal('hide');},100);
                })

                $(location).attr('href','/screenings');
            }
        });
    });
});
