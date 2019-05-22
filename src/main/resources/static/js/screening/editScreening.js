
$(function() {

    const editMovie = $('#modalMovie');
    const editTheater = $('#modalTheater');
    const editPrice = $('#modalPrice');
    const editDate = $('#modalDate');
    const editTime = $('#modalTime');
    const submitButton = $('#submitButton');

    let movieId;
    let theaterId;
    let screeningId;

    let selectedScreening;
    let editedTheater;
    let editedMovie;

    let button;
    let isEdit=false;

    $("#screeningTable").on('click','.btn-warning', function () {

        button = $(this);
        screeningId = $(this).attr('data-screeningid');

        $.ajax(`/api/screenings/${screeningId}`,   // request url
            {
                success: function (data) {// success callback function

                    console.log(data);
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

        $('.modal-title').text('Edit Screening');
        submitButton.removeClass('btn-success');
        submitButton.addClass('btn-warning')
        $("#modal").modal("show");
        isEdit = true;


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


    $('.btn-warning').click(function() {
        if(isEdit){
            selectedScreening = {
                "id":screeningId,
                "movie": editedMovie,
                "theater": editedTheater,
                "price": editPrice.val(),
                "date": editDate.val(),
                "time": editTime.val()
            }


                console.log(isEdit);
            // TODO: ajax request is fired every time `.btn-warning` is pressed
            $.ajax({

                type: 'PUT',
                url: `/screenings/${screeningId}`,
                dataType: 'json',
                data: JSON.stringify(selectedScreening),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    //TODO: Fix the refresh
                    $("#screeningTable").load(window.location + " #screeningTable");

                    // Fancy css and close the modal
                  //  button.closest('tr').css('background', 'gold');

                    //button.closest('tr').fadeOut(300, function() {
                    //    $(this).fadeIn(300);
                    //    $(this).css('background', 'white');
                        setTimeout(function(){ $('#modal').modal('hide');},100);
                    //})
                    //refresh the table only

                    console.log(isEdit);
                    console.log("screening ",screeningId, "edited");
                    isEdit=false;

                    $('#modal').on('hidden.bs.modal', function() {
                        $(this)
                            .find("input,textarea,select")
                            .val('')
                            .end();
                    })


                }
        });}
    }); });
});
