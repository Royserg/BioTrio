

$(function()
{
    const movieList = $('#movie');
    const theaterList = $('#theater');
    const addScreening = $('#addScreening');
    const price = $('#price');
    const screeningDate = $('#screeningDate');
    const screeningTime = $('#screeningTime');

    let movieId;
    let theaterId;

    let movie;
    let theater;

    movieList.change(function() {

        // https://stackoverflow.com/a/2888447
        movieId = $(this).children(":selected").data('movie_id');

        // gets the selected movie
        $.ajax(`/api/movie/${movieId}`,   // request url
            {
                success: function (data) {// success callback function

                    movie = data;
                }
            });
    })

    theaterList.change(function() {

        // https://stackoverflow.com/a/2888447
        theaterId = $(this).children(":selected").data('theater_id');

        $.ajax(`/api/theater/${theaterId}`,   // request url
            {
                success: function (data) {// success callback function

                    theater = data;
                }
            });
    })

    addScreening.click(function() {
            let screening = {
                "movie": movie,
                "theater": theater,
                "price": price.val(),
                "date":screeningDate.val(),
                "time":screeningTime.val()
                            }


    $.ajax({
        type: "POST",
        url:"/api/screenings/add",
        dataType: "json",
        data: JSON.stringify(screening),
        contentType: "application/json; charset=utf-8",
        success: function(data){
            // redirect to /bookings once request is successful
            $(location).attr('href','/screenings');
        }
    })
        console.log('request sent');
    })

}
)